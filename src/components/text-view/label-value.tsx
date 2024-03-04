import { Typography } from "@mui/material";

function LabelValue({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  if (!value) return <></>;
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <Typography variant="body1" color="black">
        {label}
      </Typography>
      <Typography variant="body2" color="gray">
        {value}
      </Typography>
    </div>
  );
}

export default LabelValue;
