import { IconButton, Typography } from "@mui/material";
import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-controller";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import Table from "src/components/table";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { QueryNotificationDto, getNotificationsAsync } from "./reducer/actions";
import TaskFilter from "./components/filter";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { handleToDate } from "src/utils/handle-to-date";

function NotificationList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState<QueryNotificationDto>({
    user: null,
    body: "",
    title: "",
    fromDate: "",
    toDate: "",
    page: 1,
    perPage: 10,
  });
  const {
    items: notification,
    meta: { total },
  } = useAppSelector((state) => state.notification);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.target.name;
      const value = e.target.value;
      setQuery((prev) => ({ ...prev, [name]: value, page: 1 }));
    },
    []
  );

  const handleAdd = () => {
    navigate(`send`);
  };

  const handleView = useCallback(
    (id: GridRowId) => {
      navigate(`${id}/user`);
    },
    [navigate]
  );

  const columns: GridColDef[] = [
    {
      headerName: "Title",
      field: "title",
      flex: 1,
      sortable: false,
    },
    {
      headerName: "Created At",
      field: "body",
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
      headerName: "Actoins",
      type: "actions",
      field: "actions",
      align: "center",
      flex: 1,
      getActions: ({ id, row: { removedAt, ...row } }) => [
        <IconButton onClick={() => handleView(id)}>
          <VisibilityIcon color="primary" />
        </IconButton>,
      ],
    },
  ];

  useEffect(() => {
    const { user, ...q } = query;

    const fromDate = q.fromDate
      ? new Date(q.fromDate).toISOString()
      : undefined;

    const toDate = q.toDate ? handleToDate(q.toDate).toISOString() : undefined;

    dispatch(
      getNotificationsAsync(
        { ...q, fromDate, toDate, userId: user?.id || undefined },
        () => {},
        () => {}
      )
    );
  }, [query, dispatch]);

  return (
    <div>
      <Typography variant="h4">Notification List</Typography>
      <TaskFilter
        handleAdd={handleAdd}
        handleChange={handleChange}
        query={query}
      />
      <Table
        columns={columns}
        rows={notification}
        total={total}
        defaultPage={query.page}
        onChangePage={(page) => setQuery((prev) => ({ ...prev, page }))}
        perPage={query.perPage}
      />
    </div>
  );
}

export default withAllowedRoles(
  NotificationList,
  PagesController.notification.roles
);
