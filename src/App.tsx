import { onMessageListener } from "./firebase/firebase";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AppRouter } from "./routers/router";

function App() {
  onMessageListener()
    .then((payload) => {
      console.log(payload);
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
