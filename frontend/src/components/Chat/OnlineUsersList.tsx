import { useEffect, useState } from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import { Avatar, AvatarGroup, Popover, Box, Tooltip, Typography, Stack } from "@mui/material";
import stringAvatar from "../../utils/stringAvatar";

export const OnlineUsersList = () => {
  const socket = useSocketContext();
  const [users, setUsers] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handleUsers = (userList: string[]) => {
      setUsers(userList);
    };

    socket.emit("users");
    socket.on("users", handleUsers);

    return () => {
      socket.off("users", handleUsers);
    };
  }, [socket]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Tooltip title="Online users">
        <AvatarGroup
          max={3}
          total={users.length}
          onClick={handleOpen}
          sx={{
            cursor: "pointer",
            "& .MuiAvatar-root": {
              width: 30,
              height: 30,
              fontSize: 15,
            },
          }}
        >
          {users.slice(0, 3).map((username) => (
            <Avatar key={username} {...stringAvatar(username)} />
          ))}
        </AvatarGroup>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            maxHeight: 300,
            overflowY: "auto",
            p: 2,
            minWidth: 200,
          },
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          Online Users ({users.length})
        </Typography>
        <Stack spacing={1}>
          {users.map((username) => (
            <Box key={username} display="flex" alignItems="center" gap={1}>
              <Avatar {...stringAvatar(username)} sx={{ width: 30, height: 30 }} />
              <Typography variant="body2" noWrap>
                {username}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Popover>
    </div>
  );
};

export default OnlineUsersList;
