import { useRef } from "react";
import { usePaginatedMessages } from "./usePaginatedMessages";
import MessagesItem from "./MessagesItem";
import { Box, Button } from "@mui/material";
import { ArrowDownToLine } from "lucide-react";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const MessagesList = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { messages, rowVirtualizer, isLoading, showNewMessagesBtn, scrollToBottom } = usePaginatedMessages(parentRef, contentRef);
  const userInfo = useGetUserInfo();

  return (
    <Box style={{ position: "relative" }}>
      <Box
        ref={parentRef}
        style={{
          height: "400px",
          overflow: "auto",
          border: "1px solid #ccc",
          padding: "8px",
          position: "relative",
        }}
      >
        {isLoading && <LoadingMessages />}

        <Box
          ref={contentRef}
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const message = messages[virtualRow.index];
            return (
              <Box
                key={virtualRow.key} // Guaranteed unique
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index} // Better for measurement
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <MessagesItem message={message} userInfo={userInfo} />
              </Box>
            );
          })}
        </Box>
      </Box>

      {showNewMessagesBtn && <NewMessagesButton onClick={scrollToBottom} />}
    </Box>
  );
};

const LoadingMessages = () => (
  <Box
    style={{
      position: "absolute",
      top: 8,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1,
      background: "rgba(255,255,255,0.8)",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      color: "#666",
    }}
  >
    Loading...
  </Box>
);

const NewMessagesButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    onClick={onClick}
    startIcon={<ArrowDownToLine size={18} />}
    variant="contained"
    style={{
      position: "absolute",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
      textTransform: "none",
    }}
  >
    New Messages
  </Button>
);
