import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { timeAgo } from "src/utils/time-ago";
import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-controller";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import Table from "src/components/table";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { QueryNotificationDto, getNotificationsAsync } from "./reducer/actions";
import TaskFilter from "./components/filter";
import { useNavigate } from "react-router-dom";
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
      headerName: "Notification",
      field: "title",
      flex: 2,
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ py: 1, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} noWrap>
            {row.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {row.body}
          </Typography>
        </Box>
      ),
    },
    {
      headerName: "Sent",
      field: "createdAt",
      flex: 1,
      sortable: false,
      renderCell: ({ value }) => (
        <Tooltip title={new Date(value).toLocaleString()}>
          <span>{timeAgo(value)}</span>
        </Tooltip>
      ),
    },
    {
      headerName: "Recipients",
      type: "actions",
      field: "actions",
      align: "center",
      getActions: ({ id }) => [
        <Tooltip title="View recipients">
          <IconButton onClick={() => handleView(id)}>
            <GroupsIcon color="primary" />
          </IconButton>
        </Tooltip>,
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
      <Typography variant="h4">Notifications</Typography>
      <Typography color="text.secondary">
        Messages sent to users. Open one to see who received it.
      </Typography>
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
        rowHeight={64}
      />
    </div>
  );
}

export default withAllowedRoles(
  NotificationList,
  PagesController.notification.roles
);
