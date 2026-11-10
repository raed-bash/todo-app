import { Button, MenuItem, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TextFieldHandler } from "src/components/text-field-handler";
import { Role } from "src/constants/roles";
import { QueryUserDto } from "../reducer/actions";
import { memo } from "react";

const RoleOptions: { label: string; value?: Role }[] = [
  { label: "All" },
  { label: "Admin", value: "ADMIN" },
  { label: "Employee", value: "EMPLOYEE" },
];

const StatusOptions: { label: string; value?: "true" | "false" }[] = [
  { label: "All" },
  { label: "Active", value: "false" },
  { label: "Blocked", value: "true" },
];

type Props = {
  query: QueryUserDto;
  handleAdd: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};
function UserFilter(props: Props) {
  const { query, handleChange, handleAdd } = props;

  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, my: 2, borderRadius: 2, display: "flex", columnGap: "10px" }}
    >
      <TextFieldHandler
        label="Search"
        name="username"
        value={query.username}
        onChange={handleChange}
        fullWidth
      />
      <TextFieldHandler
        label="Role"
        name="role"
        onChange={handleChange}
        value={query.role || ""}
        fullWidth
        select
      >
        {RoleOptions.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextFieldHandler>
      <TextFieldHandler
        label="Status"
        name="locked"
        onChange={handleChange}
        value={query.locked || ""}
        fullWidth
        select
      >
        {StatusOptions.map(({ label, value }) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextFieldHandler>
      <Button
        variant="contained"
        onClick={handleAdd}
        startIcon={<AddIcon />}
        sx={{ flexShrink: 0, whiteSpace: "nowrap", px: 3 }}
      >
        New user
      </Button>
    </Paper>
  );
}

export default memo(UserFilter);
