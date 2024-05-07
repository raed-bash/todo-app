import { useEffect, useState } from "react";
import {
  NotificationWithUser,
  NotificationIdUserId,
} from "./notification-item";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getNotificationsAsync, readNotificationAsync } from "src/app/actions";

type Props = {
  children: ({
    notifications,
    handleReadNotification,
    handleScroll,
    unseenTotal,
  }: {
    notifications: NotificationWithUser[];
    handleScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
    unseenTotal: number;
    handleReadNotification: ({
      notificationId,
      userId,
    }: {
      notificationId: number;
      userId: number;
    }) => void;
  }) => JSX.Element;
};

function NotificationsBoxContainer({ children }: Props) {
  const dispatch = useAppDispatch();
  const {
    data,
    meta: { total },
    extra: { unseenTotal },
  } = useAppSelector((state) => state.app.notifications);
  const [page, setPage] = useState(1);

  const handleReadNotification = (data: NotificationIdUserId) => {
    dispatch(
      readNotificationAsync(
        { ...data, seen: true },
        () => {},
        () => {}
      )
    );
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const listbox = e.currentTarget;
    if (listbox.scrollTop + listbox.clientHeight + 10 >= listbox.scrollHeight) {
      if (data.length < total) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    dispatch(
      getNotificationsAsync(
        { moreData: page > 1, page },
        () => {},
        () => {}
      )
    );
  }, [dispatch, page]);

  return (
    children &&
    children({
      notifications: data,
      handleReadNotification,
      handleScroll,
      unseenTotal,
    })
  );
}

export default NotificationsBoxContainer;
