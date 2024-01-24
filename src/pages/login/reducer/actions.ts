import { axiosInstance } from "../../../app/axios";
import { actions } from "../../../app/slice";
import { AppDispatch } from "../../../app/store";
import { endPoint } from "../../../utils/endpoint";

export type Credientals = { username: string; password: string };
export type Token = { token: string };

export const loginAsync =
  (data: Credientals, success: (token: Token) => void, fail: () => void) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .post<Token>(endPoint("auth", "login"), data)
      .then(({ data }) => {
        dispatch(actions.login(data.token));
      })
      .catch(fail);
  };
