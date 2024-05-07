import { CaseReducer, PayloadAction, configureStore } from "@reduxjs/toolkit";
import UserReducer from "src/pages/user/reducer/slice";
import TaskReducer from "src/pages/task/reducer/slice";
import AppReducer from "./slice";
import NotificationReducer from "src/pages/notification/reducer/slice";

export const store = configureStore({
  reducer: {
    app: AppReducer,
    user: UserReducer,
    task: TaskReducer,
    notification: NotificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type Reducer<T, S> = CaseReducer<T, PayloadAction<S>>;
