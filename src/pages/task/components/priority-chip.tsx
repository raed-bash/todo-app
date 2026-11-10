import { Chip } from "@mui/material";
import { Priority } from "../reducer/slice";

const COLORS = { LOW: "default", MEDIUM: "warning", HIGH: "error" } as const;

export function PriorityChip({ priority }: { priority?: Priority }) {
  if (!priority) return null;
  return (
    <Chip
      size="small"
      variant="outlined"
      color={COLORS[priority]}
      label={priority}
    />
  );
}
