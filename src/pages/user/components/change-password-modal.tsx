import { useFormik } from "formik";
import * as Yup from "yup";
import ModalHandler from "src/components/modal-handler/modal-handler";
import { User } from "../reducer/slice";
import { useAppDispatch } from "src/app/hooks";
import { changePasswordUserAsync } from "../reducer/actions";
import TextFieldMap, {
  gridPropsWithInputProps,
} from "src/components/text-field-map";
import { ButtonHandler } from "src/components/button-handler";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

type Props = { open: boolean; handleClose: () => void; user: Partial<User> };
function ChangePasswordModal({ open, handleClose, user }: Props) {
  const dispatch = useAppDispatch();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      id: user?.id,
      password: "",
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: Yup.string().min(8).required(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password is Not Match")
        .min(8)
        .required(),
    }),
    onSubmit(values) {
      if (values.id) {
        setLoadingSubmit(true);
        dispatch(
          changePasswordUserAsync(
            { id: values.id, password: values.password },
            () => {
              handleClose();
              setLoadingSubmit(false);
            },
            () => {
              setLoadingSubmit(false);
            }
          )
        );
      }
    },
  });

  const Inputs: gridPropsWithInputProps[] = [
    {
      type: "password",
      label: "Password",
      name: "password",
    },
    {
      type: "password",
      label: "Confirm Password",
      name: "confirmPassword",
    },
  ];

  return (
    <ModalHandler open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit} style={{ minWidth: "30vw" }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Change Password: ({user.username})
          </Typography>
        </Box>
        <TextFieldMap Inputs={Inputs} formik={formik} />
        <ButtonHandler
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loadingSubmit}
        >
          {loadingSubmit ? "Changing..." : "Change Password"}
        </ButtonHandler>
      </form>
    </ModalHandler>
  );
}

export default ChangePasswordModal;
