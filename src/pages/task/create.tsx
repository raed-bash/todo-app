import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { ButtonHandler } from "src/components/button-handler";
import { Task } from "./reducer/slice";
import { useAppDispatch } from "src/app/hooks";
import { addTaskAsync } from "./reducer/actions";
import TextFieldMap, {
  gridPropsWithInputProps,
} from "src/components/text-field-map";
import { withAllowedRoles } from "src/HOC/with-allowed-Roles";
import { PagesController } from "src/constants/pages-controller";
import { useNavigate, useParams } from "react-router-dom";

function TaskCreate() {
  const { userId: userIdStr } = useParams();
  const userId = userIdStr ? parseInt(userIdStr) : undefined;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const formik = useFormik({
    initialValues: { userId, title: "" },
    validationSchema: Yup.object({ title: Yup.string().min(3).required() }),
    onSubmit(values) {
      setLoadingSubmit(true);
      dispatch(
        addTaskAsync(
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
    {
      name: "title",
      label: "Title",
      autoFocus: true,
      multiline: true,
      minRows: 2,
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

export default withAllowedRoles(TaskCreate, PagesController.task.roles);

export class CreateTaskDto implements Pick<Task, "title"> {
  title!: string;

  userId?: number;
}
