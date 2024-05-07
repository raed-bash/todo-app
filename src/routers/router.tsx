import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { TaskRouter } from "../pages/task/router";
import Layout from "../layout";
import { UserRouter } from "../pages/user/router";
import NotFound from "../pages/not-found";
import { useAppSelector } from "../app/hooks";
import Login from "../pages/login";
import { Container } from "../container";
import { HomeRouter } from "../pages/home/router";
import { NotificationRouter } from "src/pages/notification/router";

function CreateRoutes() {
  const isLogged = useAppSelector((state) => state.app?.isLogged);

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Container />,
      children: [
        { index: true, element: <Navigate to={`home`} replace /> },
        {
          path: "/",
          element: isLogged ? <Layout /> : <Navigate to="/login" replace />,
          children: [
            ...HomeRouter,
            ...UserRouter,
            ...TaskRouter,
            ...NotificationRouter,
          ],
        },
        {
          path: "login",
          element: isLogged ? <Navigate to="/home" replace /> : <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export function AppRouter() {
  return <CreateRoutes />;
}
