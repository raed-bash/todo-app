import { endPoint } from "src/utils/endpoint";
import { axiosInstance } from "./axios";
import { AppDispatch } from "./store";
import { actions } from "./slice";
import {
  NotificationIdUserId,
  type Notification,
} from "src/components/notifications/notification-item";
import { PaginatedResultsDto } from "src/common/dto/paginated-result.dto";

export type NotificationResponse = PaginatedResultsDto<Notification> & {
  extra: {
    unseenTotal: number;
  };
};

export const getNotificationsAsync =
  (
    q: { moreData: boolean; page: number },
    success: () => void,
    fail: () => void
  ) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .get<NotificationResponse>(endPoint("notification"), {
        params: { page: q.page },
      })
      .then(({ data }) => {
        dispatch(actions.getNotfications({ ...data, moreData: q.moreData }));
        success();
      })
      .catch(fail);
  };

export type ReadNotification = NotificationIdUserId & { seen: boolean };

export const readNotificationAsync =
  (data: ReadNotification, success: () => void, fail: () => void) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .post<ReadNotification>(endPoint("notification", "read"), data)
      .then(({ data }) => {
        dispatch(actions.readNotification(data));
        success();
      })
      .catch(fail);
  };
