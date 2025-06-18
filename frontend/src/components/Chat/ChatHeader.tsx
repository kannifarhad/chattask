import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { LogOut } from "lucide-react";
import OnlineUsersList from "./OnlineUsersList";
import { useSession } from "../../hooks/useSession";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const ChatHeader = () => {
  const { logout } = useSession();
  const currentUser = useGetUserInfo();

  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: "20px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Avatar src="https://sinch.com/wp-content/themes/simpletexting-theme-blank/assets/favicon/android-chrome-192x192.png" style={{ width: "35px", height: "35px" }} />
        <Typography variant="h2" sx={{ fontWeight: 500, fontSize: "20px" }}>
          Welcome, <strong>{currentUser?.username}</strong>
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto", gap: "10px" }}>
        <OnlineUsersList />
        <Divider orientation="vertical" flexItem sx={{ alignSelf: "stretch" }} />{" "}
        <IconButton
          color="error"
          sx={{ borderRadius: "4px" }}
          title="Sign Out"
          onClick={() => {
            logout();
          }}
        >
          <LogOut size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};
export default ChatHeader;
