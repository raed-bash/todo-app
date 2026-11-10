import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Tooltip,
} from "@mui/material";
import { NavLinkProps, useLocation } from "react-router-dom";
import { styled } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import NavLinkWrapper from "../components/nav-link-wrapper";
import type { PathsWithSlash } from "../constants/paths";
import {
  type PageControllerTypes,
  PagesController,
} from "../constants/pages-controller";

export const NavLiLink = styled(ListItem)(({ theme }) => ({
  position: "relative",
  zIndex: 1000,
  color: theme.palette.text.primary,
}));

export const links: PageControllerTypes[] = Object.values(PagesController);

export function ListLinks({ collapsed = false }: { collapsed?: boolean }) {
  const currentRoles = useAppSelector((state) => state.app.roles);
  return (
    <>
      {links
        .filter(
          ({ roles }) =>
            currentRoles.some((role) => roles?.includes(role)) !== false
        )
        .map(({ title, Icon, to }) => (
          <Link
            key={to}
            title={title}
            Icon={Icon}
            to={to}
            collapsed={collapsed}
          />
        ))}
    </>
  );
}

function Link({
  Icon,
  title,
  to,
  collapsed,
}: Omit<PageControllerTypes, "roles"> & { collapsed: boolean }) {
  const isEqualCurrentPathname = useIsEqualCurrentPathname();
  const isActive = isEqualCurrentPathname(to);

  return (
    <NavLiLink
      disablePadding
      sx={{ px: 1, py: 0.25 }}
      slots={{ root: NavLinkWrapper }}
      slotProps={{
        // @ts-ignore
        root: {
          to,
          style: { textDecoration: "none" },
        } as NavLinkProps,
      }}
    >
      <Tooltip title={collapsed ? title : ""} placement="right">
        <ListItemButton
          selected={isActive}
          aria-label={title}
          sx={{ py: 1, justifyContent: collapsed ? "center" : "flex-start" }}
        >
          <ListItemIcon
            sx={{ color: "text.secondary", minWidth: collapsed ? 0 : 40 }}
          >
            <Icon fontSize="small" />
          </ListItemIcon>
          {!collapsed && (
            <ListItemText
              primary={title}
              primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    </NavLiLink>
  );
}

export function useIsEqualCurrentPathname() {
  const location = useLocation();

  return (anyPathname: PathsWithSlash) =>
    location.pathname.startsWith(anyPathname);
}
