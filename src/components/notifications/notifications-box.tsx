import React, { useState } from "react";
import {
  Badge,
  Box,
  Grid,
  IconButton,
  Popover,
  Typography,
  styled,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificatoinGridStyled = styled(Grid)(() => ({
  padding: "13.6px",
  borderBottomStyle: "solid",
  borderBottomWidth: "2px",
  borderBottomColor: "#a0a0a0",
}));

function NotificationsBox() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = anchorEl ? "simple-popover" : undefined;

  return (
    <Box>
      <IconButton color="inherit" aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        id={id}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Box sx={{ minHeight: "30vh", minWidth: "20vw" }}>
          <Grid container spacing={0}>
            <NotificatoinGridStyled item xs={12}>
              <Typography variant="h5">Notifications</Typography>
            </NotificatoinGridStyled>
            <NotificationItem
              title="created task to you"
              body="task assign to you"
              createdAt={"2002-04-08"}
            />
            <NotificationItem
              title="created task to you"
              body="task assign to you"
              createdAt={"2002-04-08"}
            />
            <NotificationItem
              title="created task to you"
              body="task assign to you"
              createdAt={"2002-04-08"}
            />
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
}

const NotificationItem = ({
  title,
  body,
  createdAt,
}: {
  title: string;
  body: string;
  createdAt: string;
}) => {
  return (
    <NotificatoinGridStyled
      item
      xs={12}
      sx={{
        ":hover": {
          background: "#a0a0a044",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption">
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </Box>
      <Typography slot="div" variant="body1" color="grey">
        {body}
      </Typography>
    </NotificatoinGridStyled>
  );
};
export default NotificationsBox;
