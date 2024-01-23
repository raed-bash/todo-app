import { createSlice } from "@reduxjs/toolkit";
import { Role } from "../constants/roles";
import { TokenHelpers, PayloadToken } from "../utils/token-helpers";
import { axiosInstance } from "./axios";

class AppState extends PayloadToken {
  isLogged!: boolean;
}

function setTokenToHeaders(token: string) {
  axiosInstance.defaults.headers.authorization = `Bearer ${token}`;
}

const initialState = (): AppState => {
  const token = TokenHelpers.getToken();

  const payload = registerToken(token);

  return {
    isLogged: payload ? true : false,
    ...(payload ? payload : {}),
    roles: payload ? payload.roles : [],
  };
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action: { payload: string; type: string }) => {
      const token = action.payload;
      TokenHelpers.setToken(token);
      const payload = registerToken(token);

      return {
        ...state,
        isLogged: true,
        ...(payload ? payload : {}),
        roles: payload ? payload.roles : [],
      };
    },
    logout: (state) => {
      return {
        ...state,
        isLogged: false,
        roles: [],
        userId: undefined,
        username: undefined,
      };
    },
  },
});

export const actions = AppSlice.actions;

export default AppSlice.reducer;

function registerToken(token: string | null): PayloadToken | false {
  const payload = TokenHelpers.getPayload(token);

  if (!payload || !token) {
    return false;
  }

  setTokenToHeaders(token);
  const roles: Role[] = payload.roles;
  const username = payload.username;
  const userId = payload.userId;

  return { roles, username, userId };
}
