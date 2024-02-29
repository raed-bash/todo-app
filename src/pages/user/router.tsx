import { RouteObject } from "react-router-dom";
import UserList from "./list";
import UserCreate from "./create";
import UserView from "./view";
import UserEdit from "./edit";

export const UserRouter: RouteObject[] = [
  { path: "user", element: <UserList /> },
  { path: "user/create", element: <UserCreate /> },
  { path: "user/edit/:id", element: <UserEdit /> },
  { path: "user/:id", element: <UserView /> },
];
