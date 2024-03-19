import NotificationsBoxContainer from "./notifications-box-container";
import NotificationsBoxPresenter from "./notifications-box-presenter";

function NotificationsBox() {
  return (
    <NotificationsBoxContainer>
      {({
        notifications,
        handleReadNotification,
        handleScroll,
        unseenTotal,
      }) => (
        <NotificationsBoxPresenter
          notifications={notifications}
          unseenTotal={unseenTotal}
          handleReadNotification={handleReadNotification}
          handleScroll={handleScroll}
        />
      )}
    </NotificationsBoxContainer>
  );
}

export default NotificationsBox;
