import { Box } from "@mui/material";
import { SocketContext } from "../../contexts/SocketContext";
import { useSocket } from "../../hooks/useSocket";
import ChatLayout from "./ChatLayout";

export const Chat = () => {
  const { socket, connected } = useSocket();

  if (!connected || !socket) {
    return (
      <Box display="flex" alignItems="center" alignContent="baseline" justifyContent="center" sx={{ width: "100%" }}>
        Connecting to chat...
      </Box>
    );
  }

  return (
    <SocketContext.Provider value={socket}>
      <ChatLayout />
    </SocketContext.Provider>
  );
};
