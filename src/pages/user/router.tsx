import { RouteObject } from "react-router-dom";
import UserList from "./list";
import UserCreate from "./create";
import UserView from "./view";
import UserEdit from "./edit";
import TaskList from "../task/list";
import TaskCreate from "../task/create";
import TaskEdit from "../task/edit";

export const UserRouter = [
  { path: "user", element: <UserList /> },
  { path: "user/create", element: <UserCreate /> },
  { path: "user/edit/:id", element: <UserEdit /> },
  {
    path: "user/:userId",
    element: <UserView />,
    children: [
      { index: true, element: <TaskList /> },
      { path: "create", element: <TaskCreate /> },
      { path: "edit/:id", element: <TaskEdit /> },
    ],
  },
] satisfies RouteObject[];
