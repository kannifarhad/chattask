import { Avatar, Badge } from "@mui/material";
import type { AvatarProps } from "@mui/material";

type AvatarWithStatusProps = {
  online?: boolean;
} & AvatarProps;

export default function AvatarWithStatus({ online = false, ...other }: AvatarWithStatusProps) {
  return (
    <Badge color={online ? "success" : "error"} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Avatar {...other} />
    </Badge>
  );
}
