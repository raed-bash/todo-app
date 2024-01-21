import { createSlice } from "@reduxjs/toolkit";
import type { Role } from "../../../constants/roles";
import { ReducersHelpers } from "../../../utils/reducers-helpers";

export class User {
  id!: number;

  username!: string;

  role!: Role;

  locked!: boolean;

  createdAt!: Date;

  updatedAt?: Date | null;
}

interface UserState {
  items: User[];
  view: User[];
  total: number;
}

export type UserChangePassword = {
  id: number;
  password: string;
};

// type LocReducer<T> = Reducer<UserState, T>;

const initialState: UserState = { items: [], view: [], total: 0 };

// const getUsers: LocReducer<PaginatedResultsDto<User>> = (state, action) => {
//   const { payload } = action;

//   state.items = payload.data;
//   state.total = payload.meta.total;
// };

// const getUser: LocReducer<User> = (state, action) => {
//   const { payload } = action;
// };

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: ReducersHelpers.loadItems,
    addUser: ReducersHelpers.addItem,
    getUser: ReducersHelpers.loadItem,
    editUser: ReducersHelpers.editItem,
  },
});

export const actions = UserSlice.actions;

export default UserSlice.reducer;
