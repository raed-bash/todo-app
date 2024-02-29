import { Box, Typography } from "@mui/material";
import { NotificatoinGridStyled } from "./notifications-box-presenter";

export interface Notification {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}

type Props = {
  notification: Notification;
};
function NotificationItem({ notification }: Props) {
  return (
    <NotificatoinGridStyled
      item
      xs={12}
      sx={{
        ":hover": {
          background: "#a0a0a044",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{notification.title}</Typography>
        <Typography variant="caption">
          {new Date(notification.createdAt).toLocaleString()}
        </Typography>
      </Box>
      <Typography slot="div" variant="body1" color="grey">
        {notification.body}
      </Typography>
    </NotificatoinGridStyled>
  );
}

export default NotificationItem;
