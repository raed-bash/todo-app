import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Task } from "./reducer/slice";
import { useAppDispatch } from "src/app/hooks";
import { editTaskAsync, getTaskAsync } from "./reducer/actions";
import TextFieldMap, {
  gridPropsWithInputProps,
} from "src/components/text-field-map";
import { withAllowedRoles } from "src/HOC/with-allowed-Roles";
import { PagesController } from "src/constants/pages-controller";
import { useNavigate, useParams } from "react-router-dom";
import { pick } from "lodash";
import ButtonEdit from "src/components/button-handler/button-edit";

function TaskEdit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const formik = useFormik({
    initialValues: { id: null, title: "", completed: null },
    validationSchema: Yup.object({
      title: Yup.string().min(3).optional(),
      completed: Yup.boolean().optional(),
    }),
    onSubmit(values) {
      setLoadingSubmit(true);
      dispatch(
        editTaskAsync(
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
    {
      type: "radio",
      boolean: true,
      name: "completed",
      label: "Completed",
      radios: [
        { label: "completed", value: true },
        {
          label: "inCompleted",
          value: false,
        },
      ],
    },
  ];

  useEffect(() => {
    setLoading(true);
    if (id) {
      dispatch(
        getTaskAsync(
          id,
          (task) => {
            Object.entries(pick(task, ["completed", "title", "id"])).forEach(
              ([key, value]) => {
                formik.setFieldValue(key, value);
              }
            );
            setLoading(false);
          },
          () => {}
        )
      );
    }
    // eslint-disable-next-line
  }, [dispatch, id]);

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

export default withAllowedRoles(TaskEdit, PagesController.task.roles);

export class EditTaskDto implements Pick<Task, "title"> {
  title!: string;

  completed!: boolean | null;
}
