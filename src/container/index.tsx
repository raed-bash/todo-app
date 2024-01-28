import { Outlet } from "react-router-dom";
import { AxiosInterceptorProvider } from "../app/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material";

export function Container() {
  const theme = useTheme();
  return (
    <AxiosInterceptorProvider>
      <>
        <ToastContainer
          containerId="main"
          pauseOnHover
          autoClose={1500}
          theme={theme.palette.mode}
        />
        <Outlet />
      </>
    </AxiosInterceptorProvider>
  );
}
