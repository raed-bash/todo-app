import { axiosInstance } from "../../../app/axios";
import { AppDispatch } from "../../../app/store";
import { PaginatedQueryDto } from "../../../common/dto/paginated-query.dto";
import { actions, Task, TaskChangeCompleted } from "./slice";
import { PaginatedResultsDto } from "../../../common/dto/paginated-result.dto";
import { endPoint } from "../../../utils/endpoint";
import { Data, Query } from "../../../components/autocomplete-handler";
import { CreateTaskDto } from "../create";
import { EditTaskDto } from "../edit";
// import { CreateUserDto } from "../create";
// import { EditUserDto } from "../edit";

export class QueryTaskDto extends PaginatedQueryDto {
  title?: string;

  completed?: boolean;

  fromDate?: string;

  toDate?: string;

  userId?: number;
}

export const getTasksAsync =
  (
    deleted: boolean,
    q: QueryTaskDto,
    success: (data: PaginatedResultsDto<Task>) => void,
    fail: () => void
  ) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .get<PaginatedResultsDto<Task>>(
        endPoint(
          "task",
          q.userId ? "all" : undefined,
          deleted ? "deleted" : undefined
        ),
        { params: q }
      )
      .then(({ data }) => {
        dispatch(actions.getTasks(data));
        success(data);
      })
      .catch(fail);
  };

export const addTaskAsync =
  (data: CreateTaskDto, success: (data: Task) => void, fail: () => void) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .post<Task>(endPoint("task", data.userId ? "all" : undefined), data)
      .then(({ data }) => {
        dispatch(actions.addTask(data));
        success(data);
      })
      .catch(fail);
  };

export const editTaskAsync =
  (
    data: Partial<EditTaskDto>,
    success: (data: Task) => void,
    fail: () => void
  ) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .patch<Task>(endPoint("task", data.userId ? "all" : undefined), data)
      .then(({ data }) => {
        dispatch(actions.editTask(data));
        success(data);
      })
      .catch(fail);
  };

export const getTaskAsync =
  (
    { id, userId }: { id: string; userId?: number },
    success: (data: Task) => void,
    fail: () => void
  ) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .get<Task>(endPoint("task", userId ? "all" : undefined, +id))
      .then(({ data }) => {
        dispatch(actions.getTask(data));
        success(data);
      })
      .catch(fail);
  };

export const changeCompletedTaskAsync =
  (
    data: TaskChangeCompleted,
    success: (data: Task) => void,
    fail: () => void
  ) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .post<Task>(
        endPoint("task", data.userId ? "all" : undefined, "completed"),
        data
      )
      .then(({ data }) => {
        dispatch(actions.editTask(data));
        success(data);
      })
      .catch(fail);
  };

export const getUsersAutocompleteAsync =
  (query: Query, success: (data: Data<Task>) => void, fail: () => void) =>
  () => {
    axiosInstance
      .get<Data<Task>>(endPoint("task", "all"), {
        params: { title: query.search, page: query?.page },
      })
      .then(({ data }) => {
        success(data);
      })
      .catch(fail);
  };

export const deleteTaskAsync =
  (
    { id, userId }: { id: string; userId?: number },
    success: (task: Task) => void,
    fail: () => void
  ) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .delete<Task>(endPoint("task", userId ? "all" : undefined, +id))
      .then(({ data }) => {
        dispatch(actions.deleteTask(data));
        success(data);
      })
      .catch(fail);
  };
