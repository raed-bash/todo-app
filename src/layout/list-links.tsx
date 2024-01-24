import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const links: { title: string; to: string; Icon: JSX.Element }[] = [
  { to: "/home", title: "Home", Icon: <DashboardIcon /> },
  { to: "/user", title: "Users", Icon: <PeopleIcon /> },
  { to: "/task", title: "Tasks", Icon: <PeopleIcon /> },
];

export function ListLinks() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {links.map(({ title, Icon, to }) => (
        <ListItemButton onClick={() => navigate(to)}>
          <ListItemIcon>{Icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
}
