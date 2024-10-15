import { Box, SvgIconTypeMap } from "@mui/material";
import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-controller";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Task";
import MessageIcon from "@mui/icons-material/Message";
import { useNavigate } from "react-router-dom";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";

function Home() {
  return (
    <div>
      <h1>Statistics</h1>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <ColumnLayout>
          <Card
            Icon={PeopleIcon}
            value={20}
            title="All Users"
            pathname="/user"
          />
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
          <Card
            Icon={PeopleIcon}
            value={20}
            title="Employees"
            pathname="/user"
          />
          <Card
            Icon={PeopleIcon}
            value={20}
            title="Blocked Employees"
            pathname="/user"
          />
        </ColumnLayout>
        <ColumnLayout>
          <Card
            Icon={TaskIcon}
            value={230}
            title="All Tasks"
            pathname="/task"
          />
          <Card
            Icon={TaskIcon}
            value={230}
            title="All Completed Tasks"
            pathname="/task"
          />
          <Card
            Icon={TaskIcon}
            value={230}
            title="All Uncompleted Tasks"
            pathname="/task"
          />
          <Card
            Icon={TaskIcon}
            value={230}
            title="All Deleted Completed Tasks"
            pathname="/task"
          />
          <Card
            Icon={TaskIcon}
            value={230}
            title="All Deleted Uncompleted Tasks"
            pathname="/task"
          />
          <Card Icon={TaskIcon} value={230} title="My Tasks" pathname="/task" />
          <Card
            Icon={TaskIcon}
            value={230}
            title="My Completed Tasks"
            pathname="/task"
          />
          <Card
            Icon={TaskIcon}
            value={230}
            title="My Uncompleted Tasks"
            pathname="/task"
          />
          <Card
            Icon={TaskIcon}
            value={230}
            title="My Deleted Completed Tasks"
            pathname="/task"
          />
          <Card
            Icon={TaskIcon}
            value={230}
            title="My Deleted Uncompleted Tasks"
            pathname="/task"
          />
        </ColumnLayout>
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
      </div>
    </div>
  );
}
type ColumnLayoutProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const ColumnLayout = ({ style = {}, children }: ColumnLayoutProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type CardProps = {
  title: string;
  value: number | string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  pathname: string;
};
const Card = (props: CardProps) => {
  const { title, Icon, value } = props;

  const navigate = useNavigate();
  const handleClick = (pathname: string) => {
    navigate(pathname);
  };

  return (
    <Box
      sx={{
        cursor: "pointer",
        border: "2.5px solid rgb(171 161 161)",
        minWidth: "460px",
        padding: "14px",
        paddingInline: "20px",
        borderRadius: "4px",
        // height: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.2s",
        ":hover": {
          bgcolor: "GrayText",
          borderRadius: "4px 500% 500% 4px",
        },
      }}
      onClick={() => {
        handleClick(props.pathname);
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          gap: "20px",
        }}
      >
        <Icon style={{ fontSize: "18px" }} />
        <div style={{ fontSize: "18px" }}>{title}:</div>
      </div>

      <div style={{ fontSize: "18px" }}>{value}</div>
    </Box>
  );
};
export default withAllowedRoles(Home, PagesController.home.roles);
