import { useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { withAllowedRoles } from "src/HOC/with-allowed-Roles";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { PagesController } from "src/constants/pages-controller";
import { getUserAsync } from "./reducer/actions";
import { CircularProgress, Grid, Typography } from "@mui/material";
import LabelValue from "src/components/text-view/label-value";

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
      <Grid
        container
        spacing={1}
        bgcolor="#e0e0e1"
        style={{
          padding: "10px",
          borderRadius: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Grid item xs={6}>
          <LabelValue label="Username" value={user.username} />
        </Grid>
        <Grid item xs={6}>
          <LabelValue label="Role" value={user.role} />
        </Grid>
        <Grid item xs={6}>
          <LabelValue
            label="Status"
            value={user.locked ? "Blocked" : "Active"}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelValue
            label="Created At"
            value={user.createdAt && new Date(user.createdAt).toLocaleString()}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelValue
            label="Updated At"
            value={
              user.updatedAt
                ? new Date(user.updatedAt).toLocaleString()
                : undefined
            }
          />
        </Grid>
      </Grid>
      <Outlet />
    </div>
  );
}
export default withAllowedRoles(UserView, PagesController.user.roles);
