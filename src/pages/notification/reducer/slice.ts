import { createSlice } from "@reduxjs/toolkit";
import { ReducersHelpers } from "../../../utils/reducers-helpers";
import { PaginatedMetadata } from "../../../common/dto/paginated-result.dto";

export class Notification {
  id!: number;

  title!: string;

  body!: string;

  createdAt!: string;
}

interface NotificationState {
  items: Notification[];
  view: Notification[];
  meta: PaginatedMetadata;
}

export type NotificationChangeCompleted = {
  id: number;
  completed: boolean;
  userId?: number;
};

const initialState: NotificationState = {
  items: [],
  view: [],
  meta: {
    total: 0,
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
  },
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getNotifications: ReducersHelpers.loadItems,
    addNotification: ReducersHelpers.addItem,
    getNotification: ReducersHelpers.loadItem,
  },
});

export const actions = NotificationSlice.actions;

export default NotificationSlice.reducer;
