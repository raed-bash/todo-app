import { PaletteMode, Theme as ThemeType, createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";
const themeModeValue = {
  toggleThemeMode: () => {},
} as const;

export const ThemeModeContext = createContext(themeModeValue);

export const useTheme = (): [ThemeType, typeof themeModeValue] => {
  const [mode, setMode] = useState<PaletteMode>(
    localStorage.themeMode || "light"
  );

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

  return [createTheme({ palette: { mode } }), themeMode];
};
