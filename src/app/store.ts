import { CaseReducer, PayloadAction, configureStore } from "@reduxjs/toolkit";
import UserReducer from "../pages/user/reducer/slice";
import AppReducer from "./slice";

export const store = configureStore({
  reducer: { app: AppReducer, user: UserReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type Reducer<T, S> = CaseReducer<T, PayloadAction<S>>;
