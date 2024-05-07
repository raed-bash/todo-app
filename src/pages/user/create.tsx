import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Role } from "src/constants/roles";
import TextFieldMap, {
  gridPropsWithInputProps,
} from "src/components/text-field-map";
import { Box, MenuItem } from "@mui/material";
import { ButtonHandler } from "src/components/button-handler";
import { useAppDispatch } from "src/app/hooks";
import { addUserAsync } from "./reducer/actions";
import { User } from "./reducer/slice";
import { useNavigate } from "react-router-dom";
import { withAllowedRoles } from "src/HOC/with-allowed-Roles";
import { PagesController } from "src/constants/pages-controller";

export const RoleOptions: { label: string; value: Role }[] = [
  { label: "Admin", value: "ADMIN" },
  { label: "Employee", value: "EMPLOYEE" },
];

function UserCreate() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const formik = useFormik<CreateUserDto>({
    initialValues: {
      username: "",
      role: "EMPLOYEE",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      role: Yup.string().oneOf<Role>(["ADMIN", "EMPLOYEE"]).required(),
      password: Yup.string().min(8).required(),
    }),
    onSubmit(values) {
      setLoadingSubmit(true);
      dispatch(
        addUserAsync(
          values,
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
    { name: "username", label: "Username", autoFocus: true },
    { name: "password", label: "Password" },
    {
      name: "role",
      type: "text",
      label: "Role",
      select: true,
      children: RoleOptions.map(({ label, value }) => (
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
      <TextFieldMap Inputs={Inputs} formik={formik} />
      <ButtonHandler
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loadingSubmit}
      >
        {loadingSubmit ? "Creating..." : "Create"}
      </ButtonHandler>
    </Box>
  );
}

export default withAllowedRoles(UserCreate, PagesController.user.roles);

export class CreateUserDto implements Pick<User, "username" | "role"> {
  username!: string;

  role!: "ADMIN" | "EMPLOYEE";

  password!: string;
}
