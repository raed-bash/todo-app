import { createSlice } from "@reduxjs/toolkit";
import { Role } from "../constants/roles";
import { TokenHelpers, PayloadToken } from "../utils/token-helpers";
import { axiosInstance } from "./axios";
import { type NotificationResponse, type ReadNotification } from "./actions";

class AppState extends PayloadToken {
  isLogged!: boolean;

  notifications!: NotificationResponse;
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
    notifications: {
      data: [],
      meta: { currentPage: 1, lastPage: 1, perPage: 10, total: 0 },
      extra: {
        unseenTotal: 0,
      },
    },
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
      TokenHelpers.removeToken();
      return {
        ...state,
        isLogged: false,
        roles: [],
        userId: undefined,
        username: undefined,
      };
    },
    getNotfications: (
      state,
      {
        payload,
      }: {
        payload: NotificationResponse & { moreData: boolean };
        type: string;
      }
    ) => {
      state.notifications.meta = payload.meta;
      state.notifications.extra = payload.extra;
      if (payload.moreData) {
        state.notifications.data.push(...payload.data);
        return;
      }
      state.notifications.data = payload.data;
    },
    readNotification: (
      state,
      {
        payload,
      }: {
        payload: ReadNotification;
        type: string;
      }
    ) => {
      const notificationId = payload.notificationId;
      const notificationIndex = state.notifications.data.findIndex(
        ({ notification }) => notification.id === notificationId
      );
      const notifications = state.notifications.data;
      notifications[notificationIndex] = {
        ...notifications[notificationIndex],
        seen: true,
      };

      state.notifications.extra.unseenTotal -= 1;
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
