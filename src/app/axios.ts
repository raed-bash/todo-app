import axios, { AxiosResponse } from "axios";
import { useCallback, useLayoutEffect } from "react";
import { useAppDispatch } from "./hooks";
import { actions } from "./slice";
import { ToastOptions, TypeOptions, toast } from "react-toastify";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
const notificationRunning: Record<number, string> = {};
export function AxiosInterceptorProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const dispatch = useAppDispatch();

  const handleResponse = useCallback(
    (response: AxiosResponse) => {
      const status = response.status;
      let typeMessage: TypeOptions = "default";
      if (status > 199 && status < 300) {
        typeMessage = "success";
      } else if (status > 299 && status < 400) {
        typeMessage = "warning";
      } else if (status > 399) {
        typeMessage = "error";
        if (status === 401) dispatch(actions.logout());
      }
      const message = response.data?.message;

      if (
        typeof message === "string" &&
        notificationRunning[status] !== message
      ) {
        notificationRunning[status] = message;

        setTimeout(() => {
          delete notificationRunning[status];
        }, 1500);

        showMessage(response?.data?.message, { type: typeMessage });
      } else if (Array.isArray(message)) {
        const joinnedMessage = message.join(", ");

        if (notificationRunning[status] === joinnedMessage) return;

        notificationRunning[status] = joinnedMessage;

        setTimeout(() => {
          delete notificationRunning[status];
        }, 1500);

        showMessage(joinnedMessage, {
          type: typeMessage,
        });
      }
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

function showMessage(message: string, options: ToastOptions) {
  toast(message, {
    containerId: "main",
    type: "default",
    ...options,
  });
}
