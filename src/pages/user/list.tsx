import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { QueryUserDto, getUsersAsync } from "./reducer/actions";
import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-controller";
import Table from "../../components/table";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, IconButton, MenuItem, Typography } from "@mui/material";
import { TextFieldHandler } from "../../components/text-field-handler";
import { Role } from "../../constants/roles";
import { toCapitalize } from "../../utils/to-capitalize";
import { useNavigate } from "react-router-dom";

const RoleOptions: { label: string; value?: Role }[] = [
  { label: "All" },
  { label: "Admin", value: "ADMIN" },
  { label: "Employee", value: "EMPLOYEE" },
];

const StatusOptions: { label: string; value?: "true" | "false" }[] = [
  { label: "All" },
  { label: "Active", value: "false" },
  { label: "Blocked", value: "true" },
];

function UserList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    meta: { total },
    items: users,
  } = useAppSelector((state) => state.user);
  const [query, setQuery] = useState<QueryUserDto>({
    locked: undefined,
    page: 1,
    perPage: 10,
    role: undefined,
    username: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const name = e.target.name;
      const value = e.target.value;
      setQuery((prev) => ({ ...prev, [name]: value, page: 1 }));
    },
    []
  );
  const handleAdd = () => {
    navigate("create");
  };

  const handleEdit = (id: GridRowId) => {
    navigate(`edit/${id}`);
  };

  const handleView = (id: GridRowId) => {
    navigate(`${id}`);
  };

  const columns: GridColDef[] = [
    { headerName: "Username", field: "username", flex: 1, sortable: false },
    {
      headerName: "Role",
      field: "role",
      flex: 1,
      sortable: false,
      valueGetter: ({ value }) => toCapitalize(value),
    },
    {
      headerName: "Status",
      field: "locked",
      valueGetter: ({ value }) => (value ? "Blocked" : "Active"),
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
      headerName: "Actions",
      field: "actions",
      type: "actions",
      flex: 1,
      getActions: ({ id }) => [
        <IconButton onClick={() => handleEdit(id)}>
          <EditIcon color="primary" />
        </IconButton>,
        <IconButton>
          <ChangeCircleIcon color="success" />
        </IconButton>,
        <IconButton>
          <BlockIcon color="error" />
        </IconButton>,
        <IconButton onClick={() => handleView(id)}>
          <VisibilityIcon color="primary" />
        </IconButton>,
      ],
    },
  ];

  useEffect(() => {
    dispatch(
      getUsersAsync(
        query,
        () => {},
        () => {}
      )
    );
  }, [dispatch, query]);

  return (
    <div>
      <Typography variant="h4">User List</Typography>
      <Box sx={{ marginY: 2, display: "flex", columnGap: "10px" }}>
        <TextFieldHandler
          label="Search"
          name="username"
          value={query.username}
          onChange={handleChange}
          fullWidth
        />
        <TextFieldHandler
          label="Role"
          name="role"
          onChange={handleChange}
          value={query.role || ""}
          fullWidth
          select
        >
          {RoleOptions.map(({ label, value }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextFieldHandler>
        <TextFieldHandler
          label="Status"
          name="locked"
          onChange={handleChange}
          value={query.locked || ""}
          fullWidth
          select
        >
          {StatusOptions.map(({ label, value }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextFieldHandler>
        <Button sx={{ width: "30vw" }} variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>
      <Table
        columns={columns}
        rows={users}
        total={total}
        defaultPage={query.page}
        onChangePage={(page) => setQuery((prev) => ({ ...prev, page }))}
        perPage={query.perPage}
      />
    </div>
  );
}

export default withAllowedRoles(UserList, PagesController.user.roles);
