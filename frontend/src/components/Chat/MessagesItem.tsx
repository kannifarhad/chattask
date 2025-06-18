import { memo } from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import type { MessageType } from "../../types";
import { stringAvatar } from "../../utils/stringAvatar";
import { formatTimestamp } from "../../utils/formatTimestamp";

export const MessagesItem = ({ message, userInfo }: { message: MessageType; userInfo: { username: string | null } }) => {
  const isYou = message.username === userInfo.username;
  const isSystem = message.username.toLowerCase() === "system";
  const timestamp = formatTimestamp(message.createdAt);

  if (isSystem) {
    return <SystemMessage message={message} timestamp={timestamp} />;
  }

  return (
    <Box display="flex" justifyContent={isYou ? "flex-end" : "flex-start"} my={1} px={2} gap={1} flexWrap="wrap">
      {!isYou && <Avatar {...stringAvatar(message.username)} sx={{ width: 35, height: 35, mt: "5px" }} />}

      <Box maxWidth="75%">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5} gap={1}>
          {!isYou && (
            <Typography variant="subtitle2" fontWeight={600} color={"text.secondary"}>
              {message.username}
            </Typography>
          )}
          <Typography variant="caption" sx={{ color: isYou ? "text.disabled" : "text.secondary", marginLeft: "auto" }} title={timestamp}>
            {timestamp}
          </Typography>
        </Box>

        <Paper
          elevation={1}
          sx={{
            padding: "10px 15px",
            bgcolor: isYou ? "primary.main" : "grey.100",
            color: isYou ? "primary.contrastText" : "text.primary",
            borderRadius: 2,
            borderTopRightRadius: isYou ? 1 : 2,
            borderTopLeftRadius: isYou ? 2 : 1,
            wordBreak: "break-word",
          }}
        >
          <Typography variant="body2">{message.content}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export const SystemMessage = ({ message, timestamp }: { message: MessageType; timestamp: string }) => {
  return (
    <Box display="flex" justifyContent="center" my={1}>
      <Typography variant="caption" color="text.secondary" fontStyle="italic" textAlign="center" title={timestamp}>
        {message.content}
        <Typography component="span" variant="caption" sx={{ ml: 1, color: "gray" }}>
          {timestamp}
        </Typography>
      </Typography>
    </Box>
  );
};
export default memo(MessagesItem);
