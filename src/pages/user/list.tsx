import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { QueryUserDto, editUserAsync, getUsersAsync } from "./reducer/actions";
import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-controller";
import Table from "../../components/table";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import HttpsIcon from "@mui/icons-material/Https";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Typography, Box } from "@mui/material";
import { toCapitalize } from "../../utils/to-capitalize";
import { useNavigate, useParams } from "react-router-dom";
import ChangePasswordModal from "./components/change-password-modal";
import UserFilter from "./components/filter";
import { User } from "./reducer/slice";
import { Roles } from "src/constants/roles";

function UserList() {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    meta: { total },
    items: users,
  } = useAppSelector((state) => state.user);
  const [user, setUser] = useState<Partial<User>>({});
  const [open, setOpen] = useState({ changePassword: false, delete: false });
  const [query, setQuery] = useState<QueryUserDto>({
    locked: undefined,
    page: 1,
    perPage: 10,
    role: undefined,
    username: "",
    notificationId: notificationId ? parseInt(notificationId) : undefined,
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const name = e.target.name;
      const value = e.target.value;
      setQuery((prev) => ({ ...prev, [name]: value, page: 1 }));
    },
    []
  );

  const emptyUserObject = () => {
    setUser({});
  };

  const handleAdd = () => {
    navigate("/user/create");
  };

  const handleEdit = (id: GridRowId) => {
    navigate(`/user/edit/${id}`);
  };

  const handleView = (id: GridRowId) => {
    navigate(`/user/${id}`);
  };

  const handleOpenChanagePasswordModal = (user: User) => {
    setOpen((prev) => ({ ...prev, changePassword: true }));
    setUser(user);
  };

  const handleCloseChangePasswordModal = () => {
    setOpen((prev) => ({ ...prev, changePassword: false }));
    emptyUserObject();
  };

  const handleStatusToggle = (user: User) => {
    dispatch(
      editUserAsync(
        { id: user.id, locked: !user.locked },
        () => {},
        () => {}
      )
    );
  };

  const columns: GridColDef[] = [
    {
      headerName: "Username",
      field: "username",
      flex: 1,
      sortable: false,
    },
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
      renderCell: ({ value }) => {
        return (
          <Box
            sx={{ p: 0.5, px: 3, borderRadius: "5px" }}
            bgcolor={value ? "error.main" : "success.main"}
            color={"white"}
            fontSize={"14px"}
          >
            {value ? "Locked" : "Active"}
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
      headerName: "Actions",
      field: "actions",
      type: "actions",
      align: "right",
      flex: 1,
      getActions: ({ id, row }) => [
        <IconButton onClick={() => handleEdit(id)}>
          <EditIcon color="primary" />
        </IconButton>,
        <IconButton onClick={() => handleOpenChanagePasswordModal(row)}>
          <ChangeCircleIcon color="success" />
        </IconButton>,
        <IconButton onClick={() => handleStatusToggle(row)}>
          {row?.locked ? (
            <HttpsIcon color="error" />
          ) : (
            <NoEncryptionGmailerrorredIcon color="success" />
          )}
        </IconButton>,
        row.role !== Roles.ADMIN ? (
          <IconButton onClick={() => handleView(id)}>
            <VisibilityIcon color="primary" />
          </IconButton>
        ) : (
          <></>
        ),
      ],
    },
  ];

  useEffect(() => {
    dispatch(
      getUsersAsync(
        { ...query },
        () => {},
        () => {}
      )
    );
  }, [dispatch, query]);

  return (
    <div>
      <Typography variant="h4">User List</Typography>
      <UserFilter
        handleAdd={handleAdd}
        handleChange={handleChange}
        query={query}
      />
      <Table
        columns={columns}
        rows={users}
        total={total}
        defaultPage={query.page}
        onChangePage={(page) => setQuery((prev) => ({ ...prev, page }))}
        perPage={query.perPage}
      />
      <ChangePasswordModal
        open={open.changePassword}
        handleClose={handleCloseChangePasswordModal}
        user={user}
      />
    </div>
  );
}

export default withAllowedRoles(UserList, PagesController.user.roles);
