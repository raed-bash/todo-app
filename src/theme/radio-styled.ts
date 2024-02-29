import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  styled,
} from "@mui/material";

export const FormControlStyled = styled(FormControl)(() => ({
  flexDirection: "row",
  justifyContent: "space-between",
  display: "flex",
}));
export const FormLabelStyled = styled(FormLabel)(() => ({
  margin: "auto 0",
}));
export const RadioGroupStyled = styled(RadioGroup)(() => ({
  gap: "0 50px",
}));
export const FormControlLabelStyled = styled(FormControlLabel)(() => ({
  marginLeft: 0,
  marginRight: 0,
}));
