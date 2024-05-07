import { axiosInstance } from "../../../app/axios";
import { AppDispatch } from "../../../app/store";
import { PaginatedQueryDto } from "../../../common/dto/paginated-query.dto";
import { actions, Notification } from "./slice";
import { PaginatedResultsDto } from "../../../common/dto/paginated-result.dto";
import { endPoint } from "../../../utils/endpoint";
import { Data, Query } from "../../../components/autocomplete-handler";
import { SendNotifcation } from "../send";
import { User } from "src/pages/user/reducer/slice";
import { QueryUserDto } from "src/pages/user/reducer/actions";

export class QueryNotificationDto extends PaginatedQueryDto {
  user?: User | null;

  title?: string;

  body?: string;

  fromDate?: string;

  toDate?: string;
}

class QueryPayloadNotificationDto
  extends QueryNotificationDto
  implements Omit<QueryNotificationDto, "user">
{
  userId?: number | null;

  user?: undefined;
}

export const getNotificationsAsync =
  (
    q: QueryPayloadNotificationDto,
    success: (data: PaginatedResultsDto<Notification>) => void,
    fail: () => void
  ) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .get<PaginatedResultsDto<Notification>>(endPoint("notification"), {
        params: q,
      })
      .then(({ data }) => {
        dispatch(actions.getNotifications(data));
        success(data);
      })
      .catch(fail);
  };

export const addNotificationAsync =
  (
    data: SendNotifcation,
    success: (data: Notification) => void,
    fail: () => void
  ) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .post<Notification>(endPoint("notification", "send"), data)
      .then(({ data }) => {
        dispatch(actions.addNotification(data));
        success(data);
      })
      .catch(fail);
  };

export const getNotificationAsync =
  (id: number, success: (data: Notification) => void, fail: () => void) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .get<Notification>(endPoint("notification", +id))
      .then(({ data }) => {
        dispatch(actions.getNotification(data));
        success(data);
      })
      .catch(fail);
  };

export const getUsersAutocompleteAsync =
  (
    { search, ...query }: Query & QueryUserDto,
    success: (data: Data<User>) => void,
    fail: () => void
  ) =>
  () => {
    axiosInstance
      .get<Data<User>>(endPoint("user"), {
        params: { username: search, ...query },
      })
      .then(({ data }) => {
        success(data);
      })
      .catch(fail);
  };
