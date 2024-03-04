import { createSlice } from "@reduxjs/toolkit";
import type { Role } from "../../../constants/roles";
import { ReducersHelpers } from "../../../utils/reducers-helpers";
import { PaginatedMetadata } from "../../../common/dto/paginated-result.dto";

export class User {
  id!: number;

  username!: string;

  role!: Role;

  locked!: boolean;

  createdAt!: string;

  updatedAt?: string | null;
}

interface UserState {
  items: User[];
  view: User[];
  meta: PaginatedMetadata;
}

export type UserChangePassword = {
  id: number;
  password: string;
};

const initialState: UserState = {
  items: [],
  view: [],
  meta: {
    total: 0,
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
  },
};

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
