import { Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { memo } from "react";
import {
  QueryNotificationDto,
  getUsersAutocompleteAsync,
} from "../reducer/actions";
import { TextFieldHandler } from "src/components/text-field-handler";
import AutocompleteHandler from "src/components/autocomplete-handler";
import { User } from "src/pages/user/reducer/slice";

type Props = {
  query: QueryNotificationDto;
  handleAdd: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};
function TaskFilter(props: Props) {
  const { handleAdd, handleChange, query } = props;

  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, my: 2, borderRadius: 2, display: "flex", columnGap: "10px" }}
    >
      <AutocompleteHandler<User>
        name="user"
        label="User"
        loadItemsAsync={getUsersAutocompleteAsync}
        onChange={(user) => {
          handleChange({
            target: { name: "user", value: user },
          } as any);
        }}
        onClear={() =>
          handleChange({ target: { name: "user", value: null } } as any)
        }
        getOptionLabel={(user) => user.username}
        renderOption={(user) => user.username}
        defaultValue={query.user}
      />
      <TextFieldHandler
        label="title"
        name="title"
        value={query.title}
        onChange={handleChange}
        fullWidth
      />
      <TextFieldHandler
        label="body"
        name="body"
        value={query.body}
        onChange={handleChange}
        fullWidth
      />
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
        Send new
      </Button>
    </Paper>
  );
}

export default memo(TaskFilter);
