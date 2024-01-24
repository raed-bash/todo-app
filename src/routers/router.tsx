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

function CreateRoutes() {
  const isLogged = useAppSelector((state) => state.app?.isLogged);

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Container />,
      children: [
        {
          path: "/",
          element: isLogged ? <Layout /> : <Navigate to="/login" replace />,
          children: [...HomeRouter, ...UserRouter, ...TaskRouter],
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
