import React, { useState } from "react";
import {
  Badge,
  Box,
  Grid,
  IconButton,
  Popover,
  Typography,
  styled,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationItem, {
  NotificationIdUserId,
  type Notification,
} from "./notification-item";

export const NotificatoinGridStyled = styled(Grid)(() => ({
  padding: "13.6px",
  borderBottomStyle: "solid",
  borderBottomWidth: "2px",
  borderBottomColor: "#a0a0a0",
}));

type Props = {
  notifications: Notification[];
  unseenTotal: number;
  handleScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  handleReadNotification?: (props: NotificationIdUserId) => void;
};

function NotificationsBoxPresenter({
  notifications,
  unseenTotal,
  handleReadNotification = () => {},
  handleScroll = () => {},
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = anchorEl ? "simple-popover" : undefined;

  return (
    <Box>
      <IconButton color="inherit" aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={unseenTotal} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        id={id}
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{
          paper: {
            onScroll: handleScroll,
          },
        }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Box
          sx={{
            minHeight: "30vh",
            maxHeight: "60vh",
            minWidth: "20vw",
            maxWidth: "27vw",
          }}
        >
          <Grid container spacing={0}>
            <NotificatoinGridStyled item xs={12}>
              <Typography variant="h5">Notifications</Typography>
            </NotificatoinGridStyled>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.notification.id}
                notification={notification}
                onClick={({ notificationId, userId }) =>
                  handleReadNotification({ notificationId, userId })
                }
              />
            ))}
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
}

export default NotificationsBoxPresenter;
