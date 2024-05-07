import { IconButton, IconButtonTypeMap, Tooltip } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

type Props = DefaultComponentProps<IconButtonTypeMap>;

function LogoutButton(props: Props) {
  return (
    <Tooltip title={"Logout"}>
      <IconButton
        {...props}
        sx={{
          backgroundColor: "natural.white",
          "&:hover": {
            backgroundColor: "grey.light",
          },
          ...props.sx,
        }}
      >
        <LogoutOutlinedIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
}

export default LogoutButton;
