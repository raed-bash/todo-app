import { RouteObject } from "react-router-dom";
import UserList from "./list";

export const UserRouter: RouteObject[] = [
  { path: "user", element: <UserList /> },
];
