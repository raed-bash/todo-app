import { axiosInstance } from "../../../app/axios";
import { AppDispatch } from "../../../app/store";
import { Role } from "../../../constants/roles";
import { PaginatedQueryDto } from "../../../common/dto/paginated-query.dto";
import { actions, User, UserChangePassword } from "./slice";
import { PaginatedResultsDto } from "../../../common/dto/paginated-result.dto";
import { endPoint } from "../../../utils/endpoint";

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
      .get<PaginatedResultsDto<User>>(endPoint("user"), { params: q })
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
      .post<User>(endPoint("user"), data)
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
      .patch<User>(endPoint("user"), data)
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
      .get<User>(endPoint("user", id))
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
      .post<User>(endPoint("user", "change-password"), data)
      .then(({ data }) => {
        success(data);
      })
      .catch(fail);
  };
