import { onMessageListener } from "./firebase/firebase";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppRouter } from "./routers/router";
import { toast } from "react-toastify";
import { Box, ThemeProvider, Typography } from "@mui/material";
import { useTheme, ThemeModeContext } from "./theme";

function App() {
  onMessageListener()
    .then((payload) => {
      const notification = payload.notification;
      toast.warn(
        <Box>
          <Typography variant="h6">{notification?.body}</Typography>
          <Typography variant="subtitle1">{notification?.title}</Typography>
        </Box>,
        {
          autoClose: 3000,

          pauseOnHover: true,
          draggable: true,
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
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
