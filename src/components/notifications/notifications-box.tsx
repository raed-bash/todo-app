import NotificationsBoxContainer from "./notifications-box-container";
import NotificationsBoxPresenter from "./notifications-box-presenter";

function NotificationsBox() {
  return (
    <NotificationsBoxContainer>
      {(notifications) => (
        <NotificationsBoxPresenter
          notifications={notifications}
          totalUnread={notifications.length}
        />
      )}
    </NotificationsBoxContainer>
  );
}

export default NotificationsBox;
