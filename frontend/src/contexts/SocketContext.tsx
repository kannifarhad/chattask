// src/contexts/SocketContext.ts
import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = (): Socket => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("Socket is not connected. Are you using <SocketContext.Provider>?");
  }
  return socket;
};
