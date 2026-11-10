import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import { toast } from "react-toastify";
import ModalHandler from "src/components/modal-handler/modal-handler";
import TextFieldMap, {
  gridPropsWithInputProps,
} from "src/components/text-field-map";
import { ButtonHandler } from "src/components/button-handler";
import { axiosInstance } from "src/app/axios";
import { endPoint } from "src/utils/endpoint";
import { useAppSelector } from "src/app/hooks";

const Inputs: gridPropsWithInputProps[] = [
  { type: "password", label: "Current Password", name: "currentPassword" },
  { type: "password", label: "New Password", name: "newPassword" },
  { type: "password", label: "Confirm New Password", name: "confirmPassword" },
];

function ChangeOwnPassword() {
  const username = useAppSelector((state) => state.app.username);
  const [open, setOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string().min(8).required(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Password is Not Match")
        .required(),
    }),
    onSubmit({ currentPassword, newPassword }, { resetForm }) {
      setLoadingSubmit(true);
      axiosInstance
        .post(endPoint("user", "me", "change-password"), {
          currentPassword,
          newPassword,
        })
        .then(() => {
          toast.success("Password changed", { containerId: "main" });
          resetForm();
          setOpen(false);
        })
        .catch(() => {})
        .finally(() => setLoadingSubmit(false));
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Change my password">
        <IconButton onClick={() => setOpen(true)}>
          <KeyIcon color="primary" />
        </IconButton>
      </Tooltip>
      <ModalHandler open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit} style={{ minWidth: "30vw" }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Change My Password{username ? ` (${username})` : ""}
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
    </>
  );
}

export default ChangeOwnPassword;
