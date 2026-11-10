import { Box, Divider, Grid, MenuItem, Paper, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import GroupsIcon from "@mui/icons-material/Groups";
import NotificationItem from "src/components/notifications/notification-item";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { ButtonHandler } from "src/components/button-handler";
import { Notification } from "./reducer/slice";
import { useAppDispatch } from "src/app/hooks";
import { addNotificationAsync } from "./reducer/actions";
import TextFieldMap, {
  gridPropsWithInputProps,
} from "src/components/text-field-map";
import { withAllowedRoles } from "src/HOC/with-allowed-Roles";
import { PagesController } from "src/constants/pages-controller";
import { useNavigate } from "react-router-dom";
import { Role } from "src/constants/roles";
import { User } from "../user/reducer/slice";
import UsersFieldsArray from "./components/users-fields-arrays";

function NotificationSend() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const formik = useFormik<SendNotificationFormikValues>({
    initialValues: {
      title: "",
      body: "",
      role: "ALL",
      users: [new FakeUserDefaultOption()],
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).required(),
      body: Yup.string().min(3).required(),
      role: Yup.string()
        .oneOf<RoleWithALL>(["ADMIN", "EMPLOYEE", "ALL"])
        .required(),
      users: Yup.array().of(Yup.object().optional()),
    }),
    onSubmit(values) {
      setLoadingSubmit(true);
      values.users = values.users.filter((value) => value.id);
      dispatch(
        addNotificationAsync(
          {
            userIds: values.users.map(({ id }) => id),
            body: values.body,
            title: values.title,
            role: values.role === "ALL" ? undefined : values.role,
          },
          () => {
            setLoadingSubmit(false);
            navigate(-1);
          },
          () => {
            setLoadingSubmit(false);
          }
        )
      );
    },
  });

  const MessageInputs: gridPropsWithInputProps[] = [
    {
      name: "title",
      label: "Title",
      autoFocus: true,
    },
    {
      name: "body",
      label: "Message",
      multiline: true,
      minRows: 4,
    },
  ];

  const AudienceInputs: gridPropsWithInputProps[] = [
    {
      name: "role",
      type: "text",
      label: "Role",
      select: true,
      children: RoleOptionsWithALL.map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      )),
    },
  ];

  const selectedUsers = formik.values.users.filter((user) => user?.id).length;
  const audience = selectedUsers
    ? `${selectedUsers} selected user${selectedUsers > 1 ? "s" : ""}`
    : formik.values.role === "ALL"
      ? "Everyone"
      : `All ${formik.values.role.toLowerCase()}s`;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography variant="h4">Send Notification</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Write a message and choose who receives it.
      </Typography>
      <FormikProvider value={formik}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Message
              </Typography>
              <TextFieldMap Inputs={MessageInputs} formik={formik} />
              <Divider sx={{ my: 3 }} />
              <Typography variant="subtitle1">Audience</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Send to a role, or pick specific users (picking users overrides
                the role).
              </Typography>
              <TextFieldMap Inputs={AudienceInputs} formik={formik} />
              <Box sx={{ mt: 3 }}>
                <UsersFieldsArray<typeof formik> formik={formik} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 2,
                position: { md: "sticky" },
                top: 88,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Preview
              </Typography>
              <Paper variant="outlined" sx={{ overflow: "hidden", mb: 2 }}>
                <NotificationItem
                  notification={{
                    seen: false,
                    userId: 0,
                    notification: {
                      id: 0,
                      title: formik.values.title || "Notification title",
                      body: formik.values.body || "Your message appears here.",
                      createdAt: new Date().toISOString(),
                    } as Notification,
                  }}
                />
              </Paper>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <GroupsIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Goes to: <b>{audience}</b>
                </Typography>
              </Box>
              <ButtonHandler
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                startIcon={<SendIcon />}
                disabled={loadingSubmit}
              >
                {loadingSubmit ? "Sending..." : "Send notification"}
              </ButtonHandler>
            </Paper>
          </Grid>
        </Grid>
      </FormikProvider>
    </Box>
  );
}

export default withAllowedRoles(
  NotificationSend,
  PagesController.notification.roles
);

export type SendNotificationFormikValues = Omit<
  SendNotifcation,
  "role" | "userIds"
> & {
  role: RoleWithALL;
  users: User[];
};

export class SendNotifcation implements Pick<Notification, "title" | "body"> {
  title!: string;

  body!: string;

  userIds!: number[];

  role?: Role;
}

type RoleWithALL = Role | "ALL";

const RoleOptionsWithALL: { label: string; value: RoleWithALL }[] = [
  { label: "All", value: "ALL" },
  { label: "Admin", value: "ADMIN" },
  { label: "Employee", value: "EMPLOYEE" },
];

export class FakeUserDefaultOption implements User {
  id: number = 0;

  username: string = "";

  createdAt: string = "";

  locked: boolean = false;

  role: Role = "ADMIN";
}
