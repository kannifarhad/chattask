import { useCallback, useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { fetchMessages } from "../../api/services/messages";
import type { BaseMessageType, MessageType } from "../../types";
import { useSocketContext } from "../../contexts/SocketContext";

const PAGE_SIZE = 20;
const AUTO_SCROLL_THRESHOLD = 50;
const SHOW_BUTTON_THRESHOLD = 100;

const getTranslateY = (contentRef: React.RefObject<HTMLDivElement | null>): number => {
  const el = contentRef.current;
  if (!el) return 0;
  const match = el.style.transform.match(/translateY\(([-\d.]+)px\)/);
  return match ? parseFloat(match[1]) : 0;
};

export const usePaginatedMessages = (parentRef: React.RefObject<HTMLDivElement | null>, contentRef: React.RefObject<HTMLDivElement | null>) => {
  const socket = useSocketContext();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewMessagesBtn, setShowNewMessagesBtn] = useState(false);

  const unseenNewMessagesRef = useRef(false);
  const isFetchingRef = useRef(false);
  const isInitialLoad = useRef(true);

const fetchPage = useCallback(
  async (page: number) => {
    if (!parentRef.current) return;

    const scrollEl = parentRef.current;
    
    // Save current scrollHeight and scrollTop before update
    const prevScrollHeight = scrollEl.scrollHeight;
    const prevScrollTop = scrollEl.scrollTop;

    setIsLoading(true);
    isFetchingRef.current = true;

    const newMessages = await fetchMessages({ page, limit: PAGE_SIZE });

    setMessages((prev) => [...newMessages.reverse(), ...prev]);
    setHasMore(newMessages.length === PAGE_SIZE);

    // Wait for the DOM to update after messages prepend
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!scrollEl) return;

        const newScrollHeight = scrollEl.scrollHeight;
        const heightDiff = newScrollHeight - prevScrollHeight;

        if (!isInitialLoad.current) {
          // Shift scrollTop by height difference to maintain scroll position
          scrollEl.scrollTop = prevScrollTop + heightDiff;
        } else {
          // First load: scroll to bottom
          scrollEl.scrollTop = scrollEl.scrollHeight;
          isInitialLoad.current = false;
        }

        setIsLoading(false);
        isFetchingRef.current = false;
      });
    });
  },
  [parentRef]
);

  useEffect(() => {
    fetchPage(page);
  }, [page, fetchPage]);

  useEffect(() => {
    const handleMessage = (msg: BaseMessageType) => {
      const scrollEl = parentRef.current;
      if (!scrollEl) return;

      const distanceFromBottom = scrollEl.scrollHeight - (scrollEl.scrollTop + getTranslateY(contentRef)) - scrollEl.clientHeight;
      const shouldAutoScroll = distanceFromBottom <= AUTO_SCROLL_THRESHOLD;

      setMessages((prev) => [...prev, msg]);

      requestAnimationFrame(() => {
        if (!scrollEl) return;
        if (shouldAutoScroll) {
          scrollEl.scrollTop = scrollEl.scrollHeight;
          setShowNewMessagesBtn(false);
          unseenNewMessagesRef.current = false;
        } else {
          unseenNewMessagesRef.current = true;
          setShowNewMessagesBtn(true);
        }
      });
    };

    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket, contentRef, parentRef]);

  useEffect(() => {
    const scrollEl = parentRef.current;
    if (!scrollEl) return;

    scrollEl.scrollTop = scrollEl.scrollHeight;

    const handleScroll = () => {
      const scrollTop = scrollEl.scrollTop;
      const distanceFromBottom = scrollEl.scrollHeight - (scrollTop + getTranslateY(contentRef)) - scrollEl.clientHeight;

      if (scrollTop < 50 && hasMore && !isFetchingRef.current) {
        setPage((prev) => prev + 1);
      }

      if (distanceFromBottom < AUTO_SCROLL_THRESHOLD) {
        setShowNewMessagesBtn(false);
        unseenNewMessagesRef.current = false;
      } else {
        if (unseenNewMessagesRef.current && distanceFromBottom > SHOW_BUTTON_THRESHOLD) {
          setShowNewMessagesBtn(true);
        } else {
          setShowNewMessagesBtn(false);
        }
      }
    };

    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [hasMore, parentRef, contentRef]);

  const scrollToBottom = () => {
    const scrollEl = parentRef.current;
    if (!scrollEl) return;
    scrollEl.scrollTop = scrollEl.scrollHeight;
    setShowNewMessagesBtn(false);
    unseenNewMessagesRef.current = false;
  };

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 10,
  });

useEffect(() => {
  if (isInitialLoad.current && parentRef.current) {
    parentRef.current.scrollTop = parentRef.current.scrollHeight;
    isInitialLoad.current = false;
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return {
    messages,
    rowVirtualizer,
    isLoading,
    showNewMessagesBtn,
    scrollToBottom,
  };
};
