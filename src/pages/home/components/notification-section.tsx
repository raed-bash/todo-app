import Card from "src/components/card/card";
import { ColumnLayout } from "src/styled-components";
import MessageIcon from "@mui/icons-material/Message";

function NotificationSection() {
  return (
    <ColumnLayout>
      <Card
        Icon={MessageIcon}
        value={20}
        title="Notifications"
        pathname="/notification"
      />
      <Card
        Icon={MessageIcon}
        value={20}
        title="Notifications"
        pathname="/notification"
      />
    </ColumnLayout>
  );
}
export default NotificationSection;
