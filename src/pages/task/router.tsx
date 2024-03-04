import { RouteObject } from "react-router-dom";
import TaskList from "./list";
import TaskCreate from "./create";
import TaskEdit from "./edit";
import TaskView from "./view";

export const TaskRouter: RouteObject[] = [
  {
    path: "task",
    element: <TaskList />,
  },
  {
    path: "task/create",
    element: <TaskCreate />,
  },
  {
    path: "task/edit/:id",
    element: <TaskEdit />,
  },
  {
    path: "task/:id",
    element: <TaskView />,
  },
];
