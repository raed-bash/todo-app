import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Link,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonHandler } from "../../components/button-handler";
import TextFieldMap, { Input } from "../../components/text-field-map";
import { useMemo } from "react";
import { loginAsync } from "./reducer/actions";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Todo App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().min(8).required(),
    }),
    onSubmit: (values) => {
      dispatch(
        loginAsync(
          values,
          () => {
            navigate("/home");
          },
          () => {}
        )
      );
    },
  });

  const Inputs = useMemo<Input[]>(
    () => [
      { name: "username", label: "Username", autoFocus: true },
      {
        name: "password",
        type: "password",
        label: "Password",
        helperText: formik.touched.password && formik.errors.password,
        error: formik.touched.password && Boolean(formik.errors.password),
      },
    ],
    [formik.errors, formik.touched]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 9,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
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
          >
            Login
          </ButtonHandler>
        </Box>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}

export default Login;
