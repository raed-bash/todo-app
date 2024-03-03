import { Box, Button, MenuItem } from "@mui/material";
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
    <Box sx={{ marginY: 2, display: "flex", columnGap: "10px" }}>
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
      <Button sx={{ width: "30vw" }} variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </Box>
  );
}

export default memo(UserFilter);
