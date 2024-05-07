import { CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getNotificationAsync } from "./reducer/actions";
import LabelValue from "src/components/text-view/label-value";

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

      <Grid
        container
        spacing={1}
        bgcolor="#e0e0e1"
        style={{
          padding: "10px",
          borderRadius: "5px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Grid item xs={6}>
          <LabelValue label="Title" value={notification.title} />
        </Grid>
        <Grid item xs={6}>
          <LabelValue label="Body" value={notification.body} />
        </Grid>
        <Grid item xs={6}>
          <LabelValue
            label="Created At"
            value={new Date(notification.createdAt).toLocaleString()}
          />
        </Grid>
      </Grid>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default NotificationView;
