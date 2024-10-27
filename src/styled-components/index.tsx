import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ColumnLayout = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));
