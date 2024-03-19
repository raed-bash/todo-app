import { Box, Typography, useTheme } from "@mui/material";
import { NotificatoinGridStyled } from "./notifications-box-presenter";

export interface Notification {
  seen: boolean;
  userId: number;
  notification: {
    id: number;
    title: string;
    body: string;
    createdAt: string;
  };
}

export type NotificationIdUserId = {
  notificationId: number;
  userId: number;
};

type Props = {
  notification: Notification;
  onClick?: (props: NotificationIdUserId) => void;
};
function NotificationItem({ notification, onClick = () => {} }: Props) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <NotificatoinGridStyled
      onClick={() =>
        onClick({
          notificationId: notification.notification.id,
          userId: notification.userId,
        })
      }
      item
      xs={12}
      sx={{
        background: notification.seen
          ? isDarkMode
            ? "#00000044"
            : "#a0a0a044"
          : undefined,
        cursor: notification.seen ? "auto" : "pointer",
        ":hover": {
          background: "#a0a0a044",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{notification.notification.title}</Typography>
        <Typography variant="caption">
          {new Date(notification.notification.createdAt).toLocaleString()}
        </Typography>
      </Box>
      <Typography slot="div" variant="body1" color="grey">
        {notification.notification.body}
      </Typography>
    </NotificatoinGridStyled>
  );
}

export default NotificationItem;
