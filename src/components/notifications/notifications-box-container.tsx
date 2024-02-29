import { useEffect } from "react";
import { Notification } from "./notification-item";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getNotificationsAsync } from "src/app/actions";

type Props = {
  children: (notifications: Notification[]) => JSX.Element;
};
function NotificationsBoxContainer({ children }: Props) {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.app.notifications);
  useEffect(() => {
    dispatch(
      getNotificationsAsync(
        {},
        () => {},
        () => {}
      )
    );
  }, [dispatch]);

  return children && children(notifications);
}

export default NotificationsBoxContainer;
