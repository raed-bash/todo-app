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
import NotificationItem, { type Notification } from "./notification-item";

export const NotificatoinGridStyled = styled(Grid)(() => ({
  padding: "13.6px",
  borderBottomStyle: "solid",
  borderBottomWidth: "2px",
  borderBottomColor: "#a0a0a0",
}));

type Props = {
  notifications: Notification[];
  totalUnread: number;
};
function NotificationsBoxPresenter(props: Props) {
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
        <Badge badgeContent={props.totalUnread} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        id={id}
        anchorEl={anchorEl}
        onClose={handleClose}
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
            {props.notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
}

export default NotificationsBoxPresenter;
