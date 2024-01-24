import { onMessageListener } from "./firebase/firebase";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppRouter } from "./routers/router";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";

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

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
