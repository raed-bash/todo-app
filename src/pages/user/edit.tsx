import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Role } from "src/constants/roles";
import TextFieldMap, {
  gridPropsWithInputProps,
} from "src/components/text-field-map";
import { Box, MenuItem } from "@mui/material";
import { useAppDispatch } from "src/app/hooks";
import { editUserAsync, getUserAsync } from "./reducer/actions";
import { User } from "./reducer/slice";
import { useNavigate, useParams } from "react-router-dom";
import { pick } from "lodash";
import ButtonEdit from "src/components/button-handler/button-edit";

const RoleOptions: { label: string; value: Role }[] = [
  { label: "Admin", value: "ADMIN" },
  { label: "Employee", value: "EMPLOYEE" },
];

function UserEdit() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const formik = useFormik<EditUserDto>({
    initialValues: {
      id: null,
      username: "",
      role: "EMPLOYEE",
      locked: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      role: Yup.string().oneOf<Role>(["ADMIN", "EMPLOYEE"]).required(),
    }),
    onSubmit(values) {
      setLoadingSubmit(true);
      dispatch(
        editUserAsync(
          values,
          () => {
            setLoadingSubmit(false);
            navigate(-1);
          },
          () => {}
        )
      );
    },
  });

  useEffect(() => {
    setLoading(true);
    if (id) {
      dispatch(
        getUserAsync(
          id,
          (user) => {
            setLoading(false);
            Object.entries(
              pick(user, ["username", "id", "role", "locked"])
            ).forEach(([key, value]) => {
              formik.setFieldValue(key, value);
            });
          },
          () => {}
        )
      );
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  const Inputs: gridPropsWithInputProps[] = [
    { name: "username", label: "Username", autoFocus: true },

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
    {
      name: "locked",
      label: "Status",
      type: "radio",
      radios: [
        { label: "Active", value: false },
        { label: "Blocked", value: true },
      ],
      boolean: true,
    },
  ];

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 7 }}
    >
      <TextFieldMap Inputs={Inputs} formik={formik} loading={loading} />
      <ButtonEdit loading={loading} loadingSubmit={loadingSubmit} />
    </Box>
  );
}

export default UserEdit;

export class EditUserDto implements Pick<User, "username" | "role"> {
  username!: string;

  role!: "ADMIN" | "EMPLOYEE";

  id!: number | null;

  locked!: boolean | null;
}
