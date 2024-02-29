import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@mui/material";
import { NavLinkProps, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import NavLinkWrapper from "../components/nav-link-wrapper";
import type { PathsWithSlash } from "../constants/paths";
import {
  type PageControllerTypes,
  PagesController,
} from "../constants/pages-controller";

export const NavLiLink = styled(ListItem)(() => ({
  backgroundColor: "white",
  position: "relative",
  zIndex: 1000,
  color: "#000",
}));

export const links: PageControllerTypes[] = Object.values(PagesController);

export function ListLinks() {
  const currentRoles = useAppSelector((state) => state.app.roles);
  return (
    <>
      {links
        .filter(
          ({ roles }) =>
            currentRoles.some((role) => roles?.includes(role)) !== false
        )
        .map(({ title, Icon, to }) => (
          <Link key={to} title={title} Icon={Icon} to={to} />
        ))}
    </>
  );
}

function Link({ Icon, title, to }: Omit<PageControllerTypes, "roles">) {
  const theme = useTheme();
  const isEqualCurrentPathname = useIsEqualCurrentPathname();
  const isActive = isEqualCurrentPathname(to);
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <NavLiLink
      slots={{ root: NavLinkWrapper }}
      slotProps={{
        // @ts-ignore
        root: {
          to,
          style: { textDecoration: "none" },
        } as NavLinkProps,
      }}
    >
      <ListItemButton style={{ background: isActive ? "#e7e7e7" : "" }}>
        <ListItemIcon>
          <Icon
            sx={{
              color: isActive ? "#1976d2" : isDarkMode ? "#fff" : "#000",
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={{ color: isActive ? "#1976d2" : isDarkMode ? "#fff" : "#000" }}
        />
      </ListItemButton>
    </NavLiLink>
  );
}

export function useIsEqualCurrentPathname() {
  const location = useLocation();

  return (anyPathname: PathsWithSlash) =>
    location.pathname.startsWith(anyPathname);
}
