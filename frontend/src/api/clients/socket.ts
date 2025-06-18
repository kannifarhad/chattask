import { io, Socket } from "socket.io-client";
import { TOKEN_KEY } from "../../constants";

let socket: Socket | null = null;

export const createSocketConnection = (token: string): Socket => {
  if (socket) return socket;

  socket = io("http://localhost:9000", {
    transports: ["websocket"],
    auth: { token },
    autoConnect: true,
  });

  socket.on("connect_error", (err) => {
    if (err?.message?.includes("Invalid token")) {
      console.warn("Socket auth failed. Logging out...");
      sessionStorage.removeItem(TOKEN_KEY);
      location.reload();
    }
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => socket;
