import { useState, useRef } from "react";
import type { KeyboardEvent } from "react";
import { Box, Button, FormControl, TextField, InputAdornment } from "@mui/material";
import { Send } from "lucide-react";
import { useSocketContext } from "../../contexts/SocketContext";
import TypingIndicator from "./TypingIndicator";

const MAX_LENGTH = 300;
export default function MessageInput() {
  const socket = useSocketContext();
  const inputRef = useRef<HTMLInputElement>(null);
  // Used additional state to avoid unnessesary emits
  const [isTyping, setIsTyping] = useState(false);
  const [canSend, setCanSend] = useState(false);

  const handleInput = () => {
    const value = inputRef.current?.value?.trim() || "";
    setCanSend(Boolean(value));

    if (Boolean(value) && !isTyping) {
      socket.emit("typing");
      setIsTyping(true);
    } else if (value.length === 0 && isTyping) {
      socket.emit("stop-typing");
      setIsTyping(false);
    }
  };

  const sendMessage = () => {
    const value = inputRef.current?.value?.trim();
    if (!value) return;

    socket.emit("message", value);
    socket.emit("stop-typing");
    setIsTyping(false);
    setCanSend(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && canSend) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth>
        <TextField
          placeholder="Type something here…"
          inputRef={inputRef}
          inputProps={{ maxLength: MAX_LENGTH, "data-testid": "message-input" }}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" disabled={!canSend} onClick={sendMessage} startIcon={<Send size={18} style={{ marginRight: "10px" }} />} sx={{ borderRadius: 1 }}>
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <Box sx={{ mt: 1 }}>
        <TypingIndicator />
      </Box>
    </Box>
  );
}
