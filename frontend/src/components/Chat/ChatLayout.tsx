import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { MessagesList } from "./MessagesList";

export const ChatLayout = () => {
  return (
    <Box style={{ minWidth: "100%" }}>
      <ChatHeader />
      <Box>
        <MessagesList />
        <MessageInput />
      </Box>
    </Box>
  );
};

export default ChatLayout;
