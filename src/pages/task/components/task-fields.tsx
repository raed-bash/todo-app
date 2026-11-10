import { MenuItem } from "@mui/material";
import * as Yup from "yup";
import { gridPropsWithInputProps } from "src/components/text-field-map";
import { PRIORITIES } from "../reducer/slice";
import { inputToDueDate } from "../task-dates";

// Fields shared by the create and edit task forms.
export const taskExtraInputs: gridPropsWithInputProps[] = [
  {
    name: "description",
    label: "Description",
    multiline: true,
    minRows: 3,
  },
  {
    name: "priority",
    label: "Priority",
    select: true,
    gridProps: { xs: 6, pr: 1 },
    children: PRIORITIES.map((p) => (
      <MenuItem key={p} value={p}>
        {p}
      </MenuItem>
    )),
  },
  {
    name: "dueDate",
    label: "Due Date",
    type: "date",
    gridProps: { xs: 6, pl: 1 },
  },
];

export const taskExtraSchema = {
  description: Yup.string().max(5000),
  priority: Yup.string().oneOf(PRIORITIES),
  dueDate: Yup.string(),
};

// Form keeps the due date as "YYYY-MM-DD"; the API wants an ISO date or null.
export const toTaskPayload = <T extends { dueDate?: string | null }>(
  values: T
) => ({
  ...values,
  dueDate: inputToDueDate(values.dueDate),
});
