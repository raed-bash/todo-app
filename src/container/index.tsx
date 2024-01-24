import { Outlet } from "react-router-dom";
import { AxiosInterceptorProvider } from "../app/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Container() {
  return (
    <AxiosInterceptorProvider>
      <>
        <ToastContainer containerId="main" pauseOnHover autoClose={1500} />

        <Outlet />
      </>
    </AxiosInterceptorProvider>
  );
}
