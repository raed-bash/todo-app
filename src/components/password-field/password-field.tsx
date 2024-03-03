import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, InputAdornment, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { TextFieldHandler } from "../text-field-handler";

function PasswordField(props: TextFieldProps) {
  const { InputProps, ...otherProps } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <TextFieldHandler
      {...otherProps}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
      }}
    />
  );
}

export default PasswordField;
