import { axiosInstance } from "../../../app/axios";
import { AppDispatch } from "../../../app/store";
import { Endpoint } from "../../../constants/endpoints";
import { Role } from "../../../constants/roles";
import { PaginatedQueryDto } from "../../../common/dto/paginated-query.dto";
import { actions, User, UserChangePassword } from "./slice";
import { PaginatedResultsDto } from "../../../common/dto/paginated-result.dto";

export class QueryUserDto extends PaginatedQueryDto {
  username?: string;

  locked?: boolean;

  role?: Role;
}

export const getUsersAsync =
  (
    q: QueryUserDto,
    success: (data: PaginatedResultsDto<User>) => void,
    fail: () => void
  ) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .get<PaginatedResultsDto<User>>(Endpoint.user, { params: q })
      .then(({ data }) => {
        dispatch(actions.getUsers(data));
        success(data);
      })
      .catch(fail);
  };

export const addUserAsync =
  (data: User, success: (data: User) => void, fail: () => void) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .post<User>(Endpoint.user, data)
      .then(({ data }) => {
        dispatch(actions.addUser(data));
        success(data);
      })
      .catch(fail);
  };

export const editUserAsync =
  (data: User, success: (data: User) => void, fail: () => void) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .patch<User>(Endpoint.user, data)
      .then(({ data }) => {
        dispatch(actions.editUser(data));
        success(data);
      })
      .catch(fail);
  };

export const getUserAsync =
  (id: number, success: (data: User) => void, fail: () => void) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .get<User>(`${Endpoint.user}/${id}`)
      .then(({ data }) => {
        dispatch(actions.getUser(data));
        success(data);
      })
      .catch(fail);
  };

export const changePasswordUserAsync =
  (data: UserChangePassword, success: (data: User) => void, fail: () => void) =>
  () => {
    axiosInstance
      .post<User>(Endpoint.user + Endpoint.change_password, data)
      .then(({ data }) => {
        success(data);
      })
      .catch(fail);
  };
