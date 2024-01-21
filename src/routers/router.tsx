import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TaskRouter } from "../pages/task/router";
import Layout from "../layout";
import { UserRouter } from "../pages/user/router";
import { LoginRouter } from "../pages/login/router";
import NotFound from "../pages/not-found";

function CreateRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <Layout />,
      children: [...UserRouter, ...TaskRouter],
    },
    ...LoginRouter,
  ]);
  return <RouterProvider router={router} />;
}

export function AppRouter() {
  return <CreateRoutes />;
}
