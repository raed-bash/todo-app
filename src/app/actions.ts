import { endPoint } from "src/utils/endpoint";
import { axiosInstance } from "./axios";
import { AppDispatch } from "./store";
import { actions } from "./slice";
import { type Notification } from "src/components/notifications/notification-item";

export const getNotificationsAsync =
  (q: {}, success: () => void, fail: () => void) => (dispatch: AppDispatch) => {
    axiosInstance
      .get<Notification[]>(endPoint("notification"))
      .then(({ data }) => {
        dispatch(actions.getNotfications(data));
        success();
      })
      .catch(fail);
  };
