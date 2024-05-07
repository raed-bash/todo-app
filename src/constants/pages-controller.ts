import { OverridableComponent } from "@mui/material/OverridableComponent";
import { PathsWithSlash } from "./paths";
import { SvgIconTypeMap } from "@mui/material";
import { Role } from "./roles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Task";
import MessageIcon from "@mui/icons-material/Message";

export type PageControllerTypes = {
  title: string;
  to: PathsWithSlash;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  roles: Role[];
};

type Pages = {
  readonly home: PageControllerTypes;
  readonly user: PageControllerTypes;
  readonly task: PageControllerTypes;
  readonly notification: PageControllerTypes;
  readonly [index: string]: any;
};

export const PagesController: Pages = Object.freeze({
  home: {
    to: "/home",
    title: "Home",
    Icon: DashboardIcon,
    roles: ["ADMIN", "EMPLOYEE"],
  },
  user: {
    to: "/user",
    title: "Users",
    Icon: PeopleIcon,
    roles: ["ADMIN"],
  },
  task: {
    to: "/task",
    title: "Tasks",
    Icon: TaskIcon,
    roles: ["ADMIN", "EMPLOYEE"],
  },
  notification: {
    to: "/notification",
    title: "Notification",
    Icon: MessageIcon,
    roles: ["ADMIN"],
  },
});
