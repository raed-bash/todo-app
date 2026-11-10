import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getNotificationAsync } from "./reducer/actions";
import InfoSection from "src/components/text-view/info-section";
import TitleIcon from "@mui/icons-material/Title";
import EventIcon from "@mui/icons-material/Event";
import MessageIcon from "@mui/icons-material/Message";

function NotificationView() {
  const { notificationId: notificationIdStr } = useParams();
  const view = useAppSelector((state) => state.notification.view);
  const dispatch = useAppDispatch();
  const notificationId = Number(notificationIdStr);

  const notification = useMemo(() => {
    return view.find((notification) => notification.id === notificationId);
  }, [notificationId, view]);

  useEffect(() => {
    if (!notificationId) return;

    dispatch(
      getNotificationAsync(
        notificationId,
        () => {},
        () => {}
      )
    );
  }, [dispatch, notificationId]);

  if (!notification) {
    return (
      <div
        style={{
          display: "flex",
          height: "80vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4">Notification Info</Typography>
      <InfoSection
        title={notification.title}
        items={[
          { label: "Title", value: notification.title, icon: <TitleIcon /> },
          {
            label: "Created At",
            value: new Date(notification.createdAt).toLocaleString(),
            icon: <EventIcon />,
          },
          {
            label: "Body",
            value: notification.body,
            icon: <MessageIcon />,
            full: true,
          },
        ]}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default NotificationView;
