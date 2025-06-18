// src/hooks/useSocket.ts
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "../constants";
import { useSession } from "./useSession";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const { token } = useSession();
  useEffect(() => {
    if (!socketRef.current) {
      const socket = io(API_BASE_URL, {
        transports: ["websocket"],
        auth: { token },
        autoConnect: true,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Socket connected");
        setConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setConnected(false);
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [token]);

  return {
    socket: socketRef.current,
    connected,
  };
};
