import { Button, MenuItem, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TextFieldHandler } from "src/components/text-field-handler";
import { QueryTaskDto } from "../reducer/actions";
import { memo } from "react";
import { PRIORITIES } from "../reducer/slice";

const isCompletedOptions: {
  label: string;
  value?: "true" | "false" | "overdue";
}[] = [
  { label: "All" },
  { label: "Completed", value: "true" },
  { label: "inCompleted", value: "false" },
  { label: "Overdue", value: "overdue" },
];

const priorityOptions = [{ label: "All", value: "" }].concat(
  PRIORITIES.map((p) => ({ label: p, value: p }))
);

// value is "<orderBy>:<orderDir>"
export const sortOptions = [
  { label: "Newest", value: "createdAt:desc" },
  { label: "Oldest", value: "createdAt:asc" },
  { label: "Due date", value: "dueDate:asc" },
  { label: "Priority", value: "priority:desc" },
  { label: "Title", value: "title:asc" },
];

export type TaskListQuery = QueryTaskDto & {
  status?: string;
  sort?: string;
  employeeId?: string;
};

type Props = {
  query: TaskListQuery;
  // when given, shows an employee filter (admin "all employees" view)
  employees?: { id: number; username: string }[];
  handleAdd: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};
function TaskFilter(props: Props) {
  const { query, handleChange, handleAdd, employees } = props;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        marginY: 2,
        display: "flex",
        flexWrap: { xs: "wrap", md: "nowrap" },
        gap: "10px",
      }}
    >
      <TextFieldHandler
        label="Search"
        name="title"
        value={query.title}
        onChange={handleChange}
        fullWidth
      />
      {employees && (
        <TextFieldHandler
          label="Employee"
          name="employeeId"
          onChange={handleChange}
          value={query.employeeId || ""}
          fullWidth
          select
        >
          <MenuItem value="">All</MenuItem>
          {employees.map(({ id, username }) => (
            <MenuItem key={id} value={String(id)}>
              {username}
            </MenuItem>
          ))}
        </TextFieldHandler>
      )}
      <TextFieldHandler
        label="Status"
        name="status"
        onChange={handleChange}
        value={query.status || ""}
        fullWidth
        select
      >
        {isCompletedOptions.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextFieldHandler>
      <TextFieldHandler
        label="Priority"
        name="priority"
        onChange={handleChange}
        value={query.priority || ""}
        fullWidth
        select
      >
        {priorityOptions.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextFieldHandler>
      <TextFieldHandler
        label="Sort"
        name="sort"
        onChange={handleChange}
        value={query.sort || sortOptions[0].value}
        fullWidth
        select
      >
        {sortOptions.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextFieldHandler>
      <TextFieldHandler
        type="date"
        label="From Date"
        name="fromDate"
        onChange={handleChange}
        value={query.fromDate || ""}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextFieldHandler
        type="date"
        label="To Date"
        name="toDate"
        onChange={handleChange}
        value={query.toDate || ""}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Button
        variant="contained"
        onClick={handleAdd}
        startIcon={<AddIcon />}
        sx={{ flexShrink: 0, whiteSpace: "nowrap", px: 3 }}
      >
        New task
      </Button>
    </Paper>
  );
}

export default memo(TaskFilter);
