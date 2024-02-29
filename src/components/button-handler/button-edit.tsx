import { ButtonHandler } from ".";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { ButtonTypeMap } from "@mui/material";
import { StyledSkeleton } from "src/theme/skeleton-styled";

type Props = {
  loading?: boolean;
  loadingSubmit?: boolean;
} & DefaultComponentProps<ButtonTypeMap>;

export default function ButtonEdit({
  loading = false,
  loadingSubmit = false,
  ...otherProps
}: Props) {
  return loading ? (
    <StyledSkeleton sx={{ mt: 3, mb: 2 }} height="42px"></StyledSkeleton>
  ) : (
    <ButtonHandler
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      disabled={loadingSubmit}
      {...otherProps}
    >
      {loadingSubmit ? "Editing..." : "Edit"}
    </ButtonHandler>
  );
}
