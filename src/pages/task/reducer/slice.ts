import { createSlice } from "@reduxjs/toolkit";
import { ReducersHelpers } from "../../../utils/reducers-helpers";
import { PaginatedMetadata } from "../../../common/dto/paginated-result.dto";

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export const PRIORITIES: Priority[] = ["LOW", "MEDIUM", "HIGH"];

export class Task {
  id!: number;

  title!: string;

  description?: string | null;

  priority!: Priority;

  dueDate?: string | null;

  completed!: boolean;

  createdAt!: Date;

  updatedAt?: Date | null;

  removedAt?: Date | null;

  // owner, present in list results
  user?: { id: number; username: string };
}

interface TaskState {
  items: Task[];
  view: Task[];
  meta: PaginatedMetadata;
}

export type TaskChangeCompleted = {
  id: number;
  completed: boolean;
  userId?: number;
};

const initialState: TaskState = {
  items: [],
  view: [],
  meta: {
    total: 0,
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
  },
};

const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTasks: ReducersHelpers.loadItems,
    addTask: ReducersHelpers.addItem,
    getTask: ReducersHelpers.loadItem,
    editTask: ReducersHelpers.editItem,
    // restore also takes the task out of the current (deleted) list
    deleteTask: (state, { payload }) => {
      const taskId = payload.id;
      state.items = state.items.filter(({ id }) => id !== taskId);
    },
  },
});

export const actions = TaskSlice.actions;

export default TaskSlice.reducer;
