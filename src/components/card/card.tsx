import { Box, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useNavigate } from "react-router-dom";

type CardProps = {
  title: string;
  value: number | string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  pathname: string;
};

function Card(props: CardProps) {
  const { title, Icon, value } = props;

  const navigate = useNavigate();
  const handleClick = (pathname: string) => {
    navigate(pathname);
  };

  return (
    <Box
      sx={{
        cursor: "pointer",
        border: "2.5px solid rgb(171 161 161)",
        minWidth: "460px",
        padding: "14px",
        paddingInline: "20px",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.2s",
        ":hover": {
          bgcolor: "GrayText",
          borderRadius: "4px 500% 500% 4px",
        },
      }}
      onClick={() => {
        handleClick(props.pathname);
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          height: "100%",
          gap: "20px",
        }}
      >
        <Icon style={{ fontSize: "18px" }} />
        <div style={{ fontSize: "18px" }}>{title}:</div>
      </div>

      <div style={{ fontSize: "18px" }}>{value}</div>
    </Box>
  );
}

export default Card;
