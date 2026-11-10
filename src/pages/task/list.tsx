import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-controller";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import Table from "src/components/table";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  changeCompletedTaskAsync,
  deleteTaskAsync,
  getTasksAsync,
  restoreTaskAsync,
} from "./reducer/actions";
import RestoreIcon from "@mui/icons-material/RestoreFromTrash";
import { formatDueDate, isOverdue } from "./task-dates";
import { PriorityChip } from "./components/priority-chip";
import TaskFilter, { TaskListQuery } from "./components/filter";
import { axiosInstance } from "src/app/axios";
import { endPoint } from "src/utils/endpoint";
import { User } from "../user/reducer/slice";
import { useGuardPermission } from "src/hooks/use-guard-permission";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Task } from "./reducer/slice";
import TabsHandler from "./components/tabs";
import { handleToDate } from "src/utils/handle-to-date";

function TaskList() {
  const dispatch = useAppDispatch();
  const { userId: userIdStr } = useParams();
  const userId = userIdStr ? parseInt(userIdStr) : undefined;
  const navigate = useNavigate();
  const isAdmin = useGuardPermission(["ADMIN"]);
  // Admins on the main task page can switch from their own tasks to every employee's.
  const canSeeAll = isAdmin && !userId;
  const [scope, setScope] = useState<"mine" | "all">("mine");
  const allScope = canSeeAll && scope === "all";
  const [employees, setEmployees] = useState<User[]>([]);
  const [selected, setSelected] = useState<GridRowSelectionModel>([]);
  const [query, setQuery] = useState<TaskListQuery>({
    title: "",
    status: "",
    priority: undefined,
    employeeId: "",
    sort: "createdAt:desc",
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

  // Whose task this is, when acting through the admin ("all") endpoints.
  const ownerOf = useCallback(
    (task: Task) => userId ?? (allScope ? task.user?.id : undefined),
    [userId, allScope]
  );

  const handleAdd = () => {
    navigate(`create`);
  };

  const handleEdit = (task: Task) => {
    navigate(
      allScope ? `/user/${task.user?.id}/edit/${task.id}` : `edit/${task.id}`
    );
  };

  const handleCompletedToggle = useCallback(
    (task: Task, completed = !task.completed) => {
      dispatch(
        changeCompletedTaskAsync(
          { completed, id: task.id, userId: ownerOf(task) },
          () => {},
          () => {}
        )
      );
    },
    [dispatch, ownerOf]
  );

  const handleDelete = useCallback(
    (task: Task) => {
      dispatch(
        deleteTaskAsync(
          { id: task.id.toString(), userId: ownerOf(task) },
          () => {},
          () => {}
        )
      );
    },
    [dispatch, ownerOf]
  );

  const handleRestore = useCallback(
    (task: Task) => {
      dispatch(
        restoreTaskAsync(
          { id: task.id.toString(), userId: ownerOf(task) },
          () => {},
          () => {}
        )
      );
    },
    [dispatch, ownerOf]
  );

  const handleView = (task: Task) => {
    navigate(
      allScope ? `/user/${task.user?.id}/${task.id}` : task.id.toString()
    );
  };

  const handleBulk = (action: (task: Task) => void) => {
    tasks.filter((task) => selected.includes(task.id)).forEach(action);
    setSelected([]);
  };

  useEffect(() => setSelected([]), [currentTab, scope, query]);

  useEffect(() => {
    if (!canSeeAll) return;
    // shortcut: the filter lists the first 100 employees, switch to a searchable picker beyond that.
    axiosInstance
      .get<{ data: User[] }>(endPoint("user"), {
        params: {
          role: "EMPLOYEE",
          perPage: 100,
          orderBy: "username",
          orderDir: "asc",
        },
      })
      .then(({ data }) => setEmployees(data.data))
      .catch(() => {});
  }, [canSeeAll]);

  const columns: GridColDef[] = [
    ...(allScope
      ? [
          {
            headerName: "Employee",
            field: "user",
            sortable: false,
            flex: 1,
            valueGetter: ({ row }) => row.user?.username,
          } as GridColDef,
        ]
      : []),
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
      headerName: "Priority",
      field: "priority",
      sortable: false,
      renderCell: ({ value }) => <PriorityChip priority={value} />,
    },
    {
      headerName: "Due Date",
      field: "dueDate",
      flex: 1,
      sortable: false,
      renderCell: ({ row, value }) =>
        isOverdue(row) ? (
          <Chip
            size="small"
            color="error"
            label={`Overdue · ${formatDueDate(value)}`}
          />
        ) : (
          formatDueDate(value)
        ),
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
      getActions: ({ row }: { row: Task }) => {
        const removed = Boolean(row.removedAt);
        return [
          <Checkbox
            onChange={() => handleCompletedToggle(row)}
            checked={row.completed}
            color="success"
            disabled={removed}
          />,
          <IconButton onClick={() => handleEdit(row)} disabled={removed}>
            <EditIcon color={removed ? "disabled" : "primary"} />
          </IconButton>,
          removed ? (
            <Tooltip title="Restore">
              <IconButton onClick={() => handleRestore(row)}>
                <RestoreIcon color="success" />
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton onClick={() => handleDelete(row)}>
              <DeleteIcon color="error" />
            </IconButton>
          ),
          <IconButton onClick={() => handleView(row)}>
            <VisibilityIcon color="primary" />
          </IconButton>,
        ];
      },
    },
  ];

  useEffect(() => {
    const fromDate = query.fromDate
      ? new Date(query.fromDate).toISOString()
      : undefined;

    const toDate = query.toDate
      ? handleToDate(query.toDate).toISOString()
      : undefined;

    const { status, sort, employeeId, ...rest } = query;
    const [orderBy, orderDir] = (sort || "createdAt:desc").split(":") as [
      string,
      "asc" | "desc",
    ];

    dispatch(
      getTasksAsync(
        currentTab === 1,
        {
          ...rest,
          priority: rest.priority || undefined,
          completed:
            status === "true" ? true : status === "false" ? false : undefined,
          overdue: status === "overdue" ? true : undefined,
          orderBy,
          orderDir,
          fromDate,
          toDate,
          userId: allScope ? Number(employeeId) || undefined : userId,
          all: allScope,
        },
        () => {},
        () => {}
      )
    );
  }, [query, dispatch, currentTab, userId, allScope]);

  return (
    <div>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}
      >
        <Typography variant="h4">Task List</Typography>
        {canSeeAll && (
          <ToggleButtonGroup
            size="small"
            color="primary"
            exclusive
            value={scope}
            onChange={(_, value) => {
              if (!value) return;
              setScope(value);
              setQuery((prev) => ({ ...prev, page: 1 }));
            }}
          >
            <ToggleButton value="mine">My tasks</ToggleButton>
            <ToggleButton value="all">All employees</ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>
      <TaskFilter
        handleAdd={handleAdd}
        handleChange={handleChange}
        query={query}
        employees={allScope ? employees : undefined}
      />
      <TabsHandler onChange={handleTabsChange} />
      {selected.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
          <Typography variant="body2">{selected.length} selected:</Typography>
          {currentTab === 1 ? (
            <Button size="small" onClick={() => handleBulk(handleRestore)}>
              Restore
            </Button>
          ) : (
            <>
              <Button
                size="small"
                color="success"
                onClick={() =>
                  handleBulk((task) => handleCompletedToggle(task, true))
                }
              >
                Mark completed
              </Button>
              <Button
                size="small"
                onClick={() =>
                  handleBulk((task) => handleCompletedToggle(task, false))
                }
              >
                Mark inCompleted
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleBulk(handleDelete)}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      )}
      <Table
        columns={columns}
        rows={tasks}
        total={total}
        defaultPage={query.page}
        onChangePage={(page) => setQuery((prev) => ({ ...prev, page }))}
        perPage={query.perPage}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={selected}
        onRowSelectionModelChange={setSelected}
      />
    </div>
  );
}

export default withAllowedRoles(TaskList, PagesController.task.roles);
