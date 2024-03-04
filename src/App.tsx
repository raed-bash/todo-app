import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppRouter } from "./routers/router";
import { ThemeProvider } from "@mui/material";
import { useTheme, ThemeModeContext } from "./theme";

function App() {
  const [theme, themeMode] = useTheme();

  return (
    <Provider store={store}>
      <ThemeModeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </ThemeModeContext.Provider>
    </Provider>
  );
}

export default App;
