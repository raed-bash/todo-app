import { RouteObject } from "react-router-dom";
import NotificationList from "./list";
import NotificationSend from "./send";
import NotificationView from "./view";
import { UserRouter } from "../user/router";

export const NotificationRouter: RouteObject[] = [
  {
    path: "notification",
    element: <NotificationList />,
  },
  {
    path: "notification/send",
    element: <NotificationSend />,
  },
  {
    path: "notification/:notificationId/user",
    element: <NotificationView />,
    children: [
      {
        index: true,
        element: UserRouter.find((route) => route.path === "user")?.element,
      },
      ...UserRouter,
    ],
  },
];
