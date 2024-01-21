import { RouteObject } from "react-router-dom";
import TaskList from "./list";

export const TaskRouter: RouteObject[] = [
  { path: "task", element: <TaskList /> },
];
