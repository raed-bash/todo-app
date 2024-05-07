import { Box, Grid, MenuItem, Typography } from "@mui/material";
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
import { UsersFieldsArray } from "./components/users-fields-arrays";

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

  const Inputs: gridPropsWithInputProps[] = [
    {
      name: "title",
      label: "Title",
      autoFocus: true,
    },
    {
      name: "body",
      label: "Body",
      multiline: true,
      minRows: 2,
    },
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

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 7 }}
    >
      <Typography variant="h5" mb={2}>
        Send Notification
      </Typography>
      <FormikProvider value={formik}>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <TextFieldMap Inputs={Inputs} formik={formik} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Selecting Users:</Typography>
          </Grid>
          <Grid item xs={12}>
            <UsersFieldsArray<typeof formik> formik={formik} />
          </Grid>
        </Grid>
      </FormikProvider>
      <ButtonHandler
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loadingSubmit}
      >
        {loadingSubmit ? "Sending..." : "Send"}
      </ButtonHandler>
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
