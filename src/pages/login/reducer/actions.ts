import { axiosInstance } from "../../../app/axios";
import { actions } from "../../../app/slice";
import { AppDispatch } from "../../../app/store";
import { endPoint } from "../../../utils/endpoint";

export type Credientals = { username: string; password: string };
export type Token = string;

export const loginAsync =
  (data: Credientals, success: (token: Token) => void, fail: () => void) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .post(endPoint("auth", "login"), data)
      .then(({ data: token }) => {
        dispatch(actions.login(token));
        success(token);
      })
      .catch(fail);
  };
