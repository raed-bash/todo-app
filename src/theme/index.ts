import {
  PaletteMode,
  Theme as ThemeType,
  ThemeOptions,
  alpha,
  createTheme,
} from "@mui/material";
import { createContext, useMemo, useState } from "react";

const themeModeValue = {
  toggleThemeMode: () => {},
} as const;

export const ThemeModeContext = createContext(themeModeValue);

const PRIMARY = "#4f46e5";

const palettes: Record<PaletteMode, ThemeOptions["palette"]> = {
  light: {
    mode: "light",
    primary: { main: PRIMARY },
    secondary: { main: "#db2777" },
    success: { main: "#16a34a" },
    warning: { main: "#d97706" },
    error: { main: "#dc2626" },
    background: { default: "#f5f6fa", paper: "#ffffff" },
    text: { primary: "#111827", secondary: "#6b7280" },
    divider: "#e5e7eb",
  },
  dark: {
    mode: "dark",
    primary: { main: "#818cf8" },
    secondary: { main: "#f472b6" },
    success: { main: "#4ade80" },
    warning: { main: "#fbbf24" },
    error: { main: "#f87171" },
    background: { default: "#0f1117", paper: "#171a23" },
    text: { primary: "#e5e7eb", secondary: "#9ca3af" },
    divider: "#2a2f3a",
  },
};

export const createAppTheme = (mode: PaletteMode) => {
  const base = createTheme({
    palette: palettes[mode],
    shape: { borderRadius: 10 },
    typography: {
      fontFamily:
        '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      h4: { fontWeight: 700, fontSize: "1.75rem", letterSpacing: "-0.02em" },
      h5: { fontWeight: 700, letterSpacing: "-0.01em" },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
  });

  const { palette } = base;

  return createTheme(base, {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: palette.background.default },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 8, paddingInline: 16 } },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: "inherit" },
        styleOverrides: {
          root: {
            backgroundColor: alpha(palette.background.paper, 0.85),
            backdropFilter: "blur(8px)",
            borderBottom: `1px solid ${palette.divider}`,
            color: palette.text.primary,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.background.paper,
            borderRight: `1px solid ${palette.divider}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
          outlined: { borderColor: palette.divider },
          elevation1: {
            boxShadow:
              "0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.1)",
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            border: `1px solid ${palette.divider}`,
            boxShadow: "0 12px 32px rgba(16,24,40,.16)",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&.Mui-selected": {
              backgroundColor: alpha(palette.primary.main, 0.1),
              color: palette.primary.main,
              "& .MuiListItemIcon-root": { color: palette.primary.main },
              "&:hover": { backgroundColor: alpha(palette.primary.main, 0.16) },
            },
          },
        },
      },
      MuiListItemIcon: { styleOverrides: { root: { minWidth: 40 } } },
      MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
      MuiTab: {
        styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
      },
      MuiToggleButton: {
        styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
      },
      MuiTooltip: {
        styleOverrides: { tooltip: { fontSize: 12, borderRadius: 6 } },
      },
      MuiOutlinedInput: {
        styleOverrides: { root: { backgroundColor: palette.background.paper } },
      },
    },
  });
};

export const useTheme = (): [ThemeType, typeof themeModeValue] => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    try {
      return localStorage.themeMode === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prev) => {
          const newMode = prev === "dark" ? "light" : "dark";

          localStorage.setItem("themeMode", newMode);

          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return [theme, themeMode];
};
