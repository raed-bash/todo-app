import { useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { withAllowedRoles } from "src/HOC/with-allowed-Roles";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { PagesController } from "src/constants/pages-controller";
import { getUserAsync } from "./reducer/actions";
import { Chip, CircularProgress, Typography } from "@mui/material";
import InfoSection from "src/components/text-view/info-section";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import ShieldIcon from "@mui/icons-material/Shield";
import EventIcon from "@mui/icons-material/Event";
import UpdateIcon from "@mui/icons-material/Update";

function UserView() {
  const { userId: strId } = useParams();
  const dispatch = useAppDispatch();
  const usersView = useAppSelector((state) => state.user.view);
  const intId = strId && parseInt(strId);
  const user = useMemo(
    () => usersView.find(({ id }) => id === intId),
    [usersView, intId]
  );

  useEffect(() => {
    if (strId) {
      dispatch(
        getUserAsync(
          strId,
          () => {},
          () => {}
        )
      );
    }
  }, [dispatch, strId]);

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          height: "80vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4">User Info</Typography>
      <InfoSection
        title={user.username}
        items={[
          { label: "Username", value: user.username, icon: <PersonIcon /> },
          {
            label: "Role",
            icon: <BadgeIcon />,
            value: (
              <Chip
                size="small"
                color={user.role === "ADMIN" ? "primary" : "default"}
                label={user.role}
              />
            ),
          },
          {
            label: "Status",
            icon: <ShieldIcon />,
            value: (
              <Chip
                size="small"
                color={user.locked ? "error" : "success"}
                label={user.locked ? "Blocked" : "Active"}
              />
            ),
          },
          {
            label: "Created At",
            icon: <EventIcon />,
            value: user.createdAt && new Date(user.createdAt).toLocaleString(),
          },
          {
            label: "Updated At",
            icon: <UpdateIcon />,
            value: user.updatedAt && new Date(user.updatedAt).toLocaleString(),
          },
        ]}
      />
      <Outlet />
    </div>
  );
}
export default withAllowedRoles(UserView, PagesController.user.roles);
