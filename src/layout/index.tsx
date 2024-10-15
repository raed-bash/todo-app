import { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  CssBaseline,
  Drawer,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Link,
  useTheme,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Outlet, useLocation } from "react-router-dom";
import { ListLinks } from "./list-links";
import { PagesController } from "../constants/pages-controller";
import { ThemeModeContext } from "../theme";
import NotificationsBox from "../components/notifications/notifications-box";
import { onMessageListener, requestPermission } from "src/firebase/firebase";
import { toast } from "react-toastify";
import LogoutButton from "src/components/button-handler/logout-button";
import { useAppDispatch } from "src/app/hooks";
import { actions } from "src/app/slice";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Todo App</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 220;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Layout() {
  const dispatch = useAppDispatch();
  const [isExpand, setIsExpand] = useState<boolean>(() =>
    SideBarHelpers.getExpand()
  );
  const { toggleThemeMode } = useContext(ThemeModeContext);
  const theme = useTheme();
  const location = useLocation();
  const toggleDrawer = () =>
    setIsExpand((isExpand) => {
      SideBarHelpers.setIsExpand(!isExpand);
      return !isExpand;
    });

  const handleLogout = () => {
    dispatch(actions.logout());
  };

  useEffect(() => {
    requestPermission();
  }, []);

  onMessageListener()
    .then((payload) => {
      const notification = payload.notification;
      toast.warn(
        <div>
          <div>{notification?.title}</div>
          <div>{notification?.body}</div>
        </div>,
        {
          containerId: "main",
          type: "default",
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={isExpand}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(isExpand && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {PagesController[location.pathname.slice(1)]?.title}
          </Typography>
          <Box sx={{ display: "flex", columnGap: "10px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "5px",
              }}
            >
              <Typography sx={{ textTransform: "capitalize" }}>
                {theme.palette.mode}
              </Typography>
              <IconButton color="inherit" onClick={toggleThemeMode}>
                {theme.palette.mode === "dark" ? (
                  <Brightness4Icon />
                ) : (
                  <Brightness7Icon />
                )}
              </IconButton>
            </Box>
            <NotificationsBox />
          </Box>
        </Toolbar>
      </AppBar>
      <DrawerStyled variant="permanent" open={isExpand}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListLinks />
          <Divider sx={{ my: 1 }} />
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LogoutButton onClick={handleLogout} />
        </Box>
      </DrawerStyled>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

const keyAccessIsExpand: string = "isExpand";
class SideBarHelpers {
  static Expand() {
    localStorage.setItem(keyAccessIsExpand, "1");
    return true;
  }

  static contract() {
    localStorage.setItem(keyAccessIsExpand, "0");
    return false;
  }

  static getExpand(): boolean {
    const isExpand = localStorage.getItem(keyAccessIsExpand);

    if (isExpand === "0") {
      return false;
    } else return true;
  }

  static setIsExpand(isExpand: boolean) {
    if (isExpand) {
      this.Expand();
    } else {
      this.contract();
    }
  }
}
