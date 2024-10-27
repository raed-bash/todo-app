import Card from "src/components/card/card";
import { ColumnLayout } from "src/styled-components";
import PeopleIcon from "@mui/icons-material/People";

function UserSection() {
  return (
    <ColumnLayout>
      <Card Icon={PeopleIcon} value={20} title="All Users" pathname="/user" />
      <Card
        Icon={PeopleIcon}
        value={20}
        title="Active Users"
        pathname="/user"
      />
      <Card
        Icon={PeopleIcon}
        value={20}
        title="Blocked Users"
        pathname="/user"
      />
      <Card Icon={PeopleIcon} value={20} title="Admins" pathname="/user" />
      <Card
        Icon={PeopleIcon}
        value={20}
        title="Blocked Admins"
        pathname="/user"
      />
      <Card Icon={PeopleIcon} value={20} title="Employees" pathname="/user" />
      <Card
        Icon={PeopleIcon}
        value={20}
        title="Blocked Employees"
        pathname="/user"
      />
    </ColumnLayout>
  );
}
export default UserSection;
