import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  Popover,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOffOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import NotificationItem, {
  NotificationIdUserId,
  type NotificationWithUser,
} from "./notification-item";

type Props = {
  notifications: NotificationWithUser[];
  unseenTotal: number;
  handleScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  handleReadNotification?: (props: NotificationIdUserId) => void;
  handleReadAll?: () => void;
};

function NotificationsBoxPresenter({
  notifications,
  unseenTotal,
  handleReadNotification = () => {},
  handleScroll = () => {},
  handleReadAll = () => {},
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tab, setTab] = useState<"all" | "unread">("all");
  const open = Boolean(anchorEl);
  const id = open ? "notifications-popover" : undefined;
  // shortcut: "Unread" filters the pages already loaded, not the whole history.
  const shown =
    tab === "unread" ? notifications.filter((n) => !n.seen) : notifications;

  return (
    <Box>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          aria-describedby={id}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Badge badgeContent={unseenTotal} color="error" max={99}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        id={id}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 380,
              maxWidth: "calc(100vw - 32px)",
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            pt: 1.5,
          }}
        >
          <Typography variant="subtitle1" sx={{ flex: 1 }}>
            Notifications
          </Typography>
          {unseenTotal > 0 && (
            <Chip size="small" color="primary" label={`${unseenTotal} new`} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
            sx={{ flex: 1, minHeight: 40, "& .MuiTab-root": { minHeight: 40 } }}
          >
            <Tab value="all" label="All" />
            <Tab value="unread" label="Unread" />
          </Tabs>
          <Button
            size="small"
            startIcon={<DoneAllIcon />}
            onClick={handleReadAll}
            disabled={unseenTotal === 0}
          >
            Mark all read
          </Button>
        </Box>
        <Box
          onScroll={handleScroll}
          sx={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          {shown.length === 0 ? (
            <Box
              sx={{
                py: 6,
                px: 2,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              <NotificationsOffIcon
                sx={{ fontSize: 40, mb: 1, opacity: 0.6 }}
              />
              <Typography variant="body2">
                {tab === "unread"
                  ? "You're all caught up"
                  : "No notifications yet"}
              </Typography>
            </Box>
          ) : (
            shown.map((notification) => (
              <NotificationItem
                key={notification.notification.id}
                notification={notification}
                onClick={handleReadNotification}
              />
            ))
          )}
        </Box>
      </Popover>
    </Box>
  );
}

export default NotificationsBoxPresenter;
