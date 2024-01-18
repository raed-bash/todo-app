import { onMessageListener } from "./firebase";

function App() {
  onMessageListener()
    .then((payload) => {
      console.log(payload);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Todo App</h1>
    </div>
  );
}

export default App;
