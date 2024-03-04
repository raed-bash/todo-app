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
        deleted ? endPoint("task", "deleted") : endPoint("task"),
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
      .post<Task>(endPoint("task"), data)
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
      .patch<Task>(endPoint("task"), data)
      .then(({ data }) => {
        dispatch(actions.editTask(data));
        success(data);
      })
      .catch(fail);
  };

export const getTaskAsync =
  (id: string, success: (data: Task) => void, fail: () => void) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .get<Task>(endPoint("task", +id))
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
      .post<Task>(endPoint("task", "completed"), data)
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
  (id: string, success: (task: Task) => void, fail: () => void) =>
  (dispatch: AppDispatch) => {
    axiosInstance
      .delete<Task>(endPoint("task", +id))
      .then(({ data }) => {
        dispatch(actions.deleteTask(data));
        success(data);
      })
      .catch(fail);
  };
