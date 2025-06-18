import { memo, useEffect, useState } from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import { Box } from "@mui/material";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const TypingIndicator = () => {
  const socket = useSocketContext();
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const currentUser = useGetUserInfo();

  useEffect(() => {
    const handleTypingUsers = (usernames: string[]) => {
      setTypingUsers(new Set(usernames));
    };

    socket.on("typing-users", handleTypingUsers);
    socket.emit("typing-users"); // Ask for initial typing state

    return () => {
      socket.off("typing-users", handleTypingUsers);
    };
  }, [socket]);

  const filteredTypingUsers = Array.from(typingUsers).filter((u) => u !== currentUser?.username);

  if (filteredTypingUsers.length === 0) return null;

  return (
    <Box
      sx={{
        fontSize: "12px",
        color: "#666",
        marginTop: "10px",
        fontStyle: "italic",
      }}
    >
      {filteredTypingUsers.join(", ")} {filteredTypingUsers.length === 1 ? "is" : "are"} typing...
    </Box>
  );
};

export default memo(TypingIndicator);
