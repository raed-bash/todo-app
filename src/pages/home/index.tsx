import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-controller";
import UserSection from "./components/user-section";
import TaskSection from "./components/task-section";
import NotificationSection from "./components/notification-section";

function Home() {
  return (
    <div>
      <h1>Statistics</h1>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <UserSection />
        <TaskSection />
        <NotificationSection />
      </div>
    </div>
  );
}

export default withAllowedRoles(Home, PagesController.home.roles);
