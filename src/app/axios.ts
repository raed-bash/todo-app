import axios, { AxiosResponse } from "axios";
import { useCallback, useLayoutEffect } from "react";
import { useAppDispatch } from "./hooks";
import { actions } from "./slice";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
export function AxiosInterceptorProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const dispatch = useAppDispatch();
  const handleResponse = useCallback(
    (response: AxiosResponse) => {
      if (response.status === 401) dispatch(actions.logout());
    },
    [dispatch]
  );

  useLayoutEffect(() => {
    const response = (response: AxiosResponse) => {
      handleResponse(response);
      return response;
    };

    const error = (err: any) => {
      console.error(err);
      if (err?.response) {
        handleResponse(err.response);
      }
      return Promise.reject(err);
    };

    const interceptor = axiosInstance.interceptors.response.use(
      response,
      error
    );

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [handleResponse]);

  return children;
}

export { axiosInstance };
