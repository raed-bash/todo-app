import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-controller";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import Table from "src/components/table";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  QueryTaskDto,
  changeCompletedTaskAsync,
  deleteTaskAsync,
  getTasksAsync,
} from "./reducer/actions";
import TaskFilter from "./components/filter";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Task } from "./reducer/slice";
import TabsHandler from "./components/tabs";
import { handleToDate } from "src/utils/handle-to-date";

function TaskList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState<QueryTaskDto>({
    title: "",
    completed: undefined,
    fromDate: undefined,
    toDate: undefined,
    page: 1,
    perPage: 10,
  });
  const {
    items: tasks,
    meta: { total },
  } = useAppSelector((state) => state.task);
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabsChange = useCallback((currentTab: number) => {
    setCurrentTab(currentTab);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.target.name;
      const value = e.target.value;
      setQuery((prev) => ({ ...prev, [name]: value, page: 1 }));
    },
    []
  );

  const handleAdd = () => {
    navigate(`create`);
  };

  const handleEdit = (id: GridRowId) => {
    navigate(`edit/${id}`);
  };

  const handleCompletedToggle = useCallback(
    (task: Task) => {
      dispatch(
        changeCompletedTaskAsync(
          { completed: !task.completed, id: task.id },
          () => {},
          () => {}
        )
      );
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: GridRowId) => {
      dispatch(
        deleteTaskAsync(
          id.toString(),
          () => {},
          () => {}
        )
      );
    },
    [dispatch]
  );

  const handleView = useCallback(
    (id: GridRowId) => {
      navigate(id.toString());
    },
    [navigate]
  );

  const columns: GridColDef[] = [
    {
      headerName: "Title",
      field: "title",
      flex: 1,
      sortable: false,
      renderCell: ({ row, value }) =>
        row.completed ? <del>{value}</del> : value,
    },
    {
      headerName: "Status",
      field: "completed",
      renderCell: ({ value }) => {
        return (
          <Box
            sx={{ p: 0.5, px: 3, borderRadius: "5px" }}
            bgcolor={value ? "success.main" : "error.main"}
            color={"white"}
            fontSize={"14px"}
          >
            {value ? "Completed" : "inCompleted"}
          </Box>
        );
      },
      flex: 1,

      sortable: false,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      flex: 1,
      sortable: false,
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      headerName: "Updated At",
      field: "updatedAt",
      flex: 1,
      sortable: false,
      valueFormatter: ({ value }) =>
        value ? new Date(value).toLocaleString() : "",
    },
    {
      headerName: "Actoins",
      type: "actions",
      field: "actions",
      align: "center",
      flex: 1,
      getActions: ({ id, row: { removedAt, ...row } }) => [
        <Checkbox
          onChange={() => handleCompletedToggle(row)}
          checked={row.completed}
          color="success"
          disabled={Boolean(removedAt)}
        />,
        <IconButton
          onClick={() => handleEdit(id)}
          disabled={Boolean(removedAt)}
        >
          <EditIcon color={removedAt ? "disabled" : "primary"} />
        </IconButton>,
        <IconButton
          onClick={() => handleDelete(id)}
          disabled={Boolean(removedAt)}
        >
          <DeleteIcon color={removedAt ? "disabled" : "error"} />
        </IconButton>,
        <IconButton onClick={() => handleView(id)}>
          <VisibilityIcon color="primary" />
        </IconButton>,
      ],
    },
  ];

  useEffect(() => {
    const fromDate = query.fromDate
      ? new Date(query.fromDate).toISOString()
      : undefined;

    const toDate = query.toDate
      ? handleToDate(query.toDate).toISOString()
      : undefined;

    dispatch(
      getTasksAsync(
        currentTab === 1,
        { ...query, fromDate, toDate },
        () => {},
        () => {}
      )
    );
  }, [query, dispatch, currentTab]);

  return (
    <div>
      <Typography variant="h4">Task List</Typography>
      <TaskFilter
        handleAdd={handleAdd}
        handleChange={handleChange}
        query={query}
      />
      <TabsHandler onChange={handleTabsChange} />
      <Table
        columns={columns}
        rows={tasks}
        total={total}
        defaultPage={query.page}
        onChangePage={(page) => setQuery((prev) => ({ ...prev, page }))}
        perPage={query.perPage}
      />
    </div>
  );
}

export default withAllowedRoles(TaskList, PagesController.home.roles);
