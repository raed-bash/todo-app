import { Outlet } from "react-router-dom";
import { AxiosInterceptorProvider } from "../app/axios";

export function Container() {
  return (
    <AxiosInterceptorProvider>
      <Outlet />
    </AxiosInterceptorProvider>
  );
}
