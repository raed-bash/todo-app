import { Avatar, Box, ButtonBase, Typography, alpha } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ChatBubbleIcon from "@mui/icons-material/ChatBubbleOutline";
import CampaignIcon from "@mui/icons-material/CampaignOutlined";
import { Notification } from "src/pages/notification/reducer/slice";
import { timeAgo } from "src/utils/time-ago";

export interface NotificationWithUser {
  seen: boolean;
  userId: number;
  notification: Notification;
}

export type NotificationIdUserId = {
  notificationId: number;
  userId: number;
};

// Notifications have no type field, so pick an icon from the title the service sets.
function kindOf(title: string) {
  if (/comment/i.test(title))
    return { Icon: ChatBubbleIcon, color: "secondary" as const };
  if (/task/i.test(title))
    return { Icon: TaskAltIcon, color: "primary" as const };
  return { Icon: CampaignIcon, color: "warning" as const };
}

type Props = {
  notification: NotificationWithUser;
  onClick?: (props: NotificationIdUserId) => void;
};
function NotificationItem({ notification, onClick = () => {} }: Props) {
  const { title, body, createdAt, id } = notification.notification;
  const unread = !notification.seen;
  const { Icon, color } = kindOf(title);

  return (
    <ButtonBase
      onClick={() =>
        unread && onClick({ notificationId: id, userId: notification.userId })
      }
      sx={{
        width: "100%",
        textAlign: "left",
        alignItems: "flex-start",
        gap: 1.5,
        px: 2,
        py: 1.5,
        cursor: unread ? "pointer" : "default",
        bgcolor: (theme) =>
          unread ? alpha(theme.palette.primary.main, 0.06) : "transparent",
        "&:hover": { bgcolor: "action.hover" },
        "& + &": { borderTop: 1, borderColor: "divider" },
      }}
    >
      <Avatar
        sx={{
          width: 36,
          height: 36,
          bgcolor: (theme) => alpha(theme.palette[color].main, 0.14),
          color: `${color}.main`,
        }}
      >
        <Icon fontSize="small" />
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <Typography
            variant="body2"
            fontWeight={unread ? 700 : 500}
            noWrap
            sx={{ flex: 1 }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            noWrap
            title={new Date(createdAt).toLocaleString()}
          >
            {timeAgo(createdAt)}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {body}
        </Typography>
      </Box>
      {unread && (
        <Box
          aria-label="unread"
          sx={{
            width: 8,
            height: 8,
            mt: 0.75,
            borderRadius: "50%",
            bgcolor: "primary.main",
            flexShrink: 0,
          }}
        />
      )}
    </ButtonBase>
  );
}

export default NotificationItem;
