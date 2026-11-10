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
import {
  taskExtraInputs,
  taskExtraSchema,
  toTaskPayload,
} from "./components/task-fields";
import { dueDateToInput } from "./task-dates";

function TaskEdit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, userId: userIdStr } = useParams();
  const userId = userIdStr ? parseInt(userIdStr) : undefined;
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      userId,
      id: null as number | null,
      title: "",
      completed: null as boolean | null,
      description: "",
      priority: "MEDIUM" as Task["priority"],
      dueDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(3).max(200).optional(),
      ...taskExtraSchema,
      completed: Yup.boolean().optional(),
    }),
    onSubmit(values) {
      setLoadingSubmit(true);
      dispatch(
        editTaskAsync(
          toTaskPayload(values),
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
    ...taskExtraInputs,
  ];

  useEffect(() => {
    setLoading(true);
    if (id) {
      dispatch(
        getTaskAsync(
          { id, userId },
          (task) => {
            formik.setValues({
              ...formik.values,
              ...pick(task, ["completed", "title", "id", "priority"]),
              description: task.description ?? "",
              dueDate: dueDateToInput(task.dueDate),
            });
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

  description?: string;

  priority?: Task["priority"];

  dueDate?: string | null;

  completed!: boolean | null;

  userId?: number;
}
