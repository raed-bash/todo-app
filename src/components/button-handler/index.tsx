import { Button, ButtonTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

export function ButtonHandler(props: DefaultComponentProps<ButtonTypeMap>) {
  return <Button {...props} />;
}
