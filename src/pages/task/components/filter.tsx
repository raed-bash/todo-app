import { Box, Button, MenuItem } from "@mui/material";
import { TextFieldHandler } from "src/components/text-field-handler";
import { QueryTaskDto } from "../reducer/actions";
import { memo } from "react";

const isCompletedOptions: { label: string; value?: "true" | "false" }[] = [
  { label: "All" },
  { label: "Completed", value: "true" },
  { label: "inCompleted", value: "false" },
];

type Props = {
  query: QueryTaskDto;
  handleAdd: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};
function TaskFilter(props: Props) {
  const { query, handleChange, handleAdd } = props;

  return (
    <Box sx={{ marginY: 2, display: "flex", columnGap: "10px" }}>
      <TextFieldHandler
        label="Search"
        name="title"
        value={query.title}
        onChange={handleChange}
        fullWidth
      />
      <TextFieldHandler
        label="isCompleted"
        name="completed"
        onChange={handleChange}
        value={query.completed || ""}
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
      <Button sx={{ width: "30vw" }} variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </Box>
  );
}

export default memo(TaskFilter);
