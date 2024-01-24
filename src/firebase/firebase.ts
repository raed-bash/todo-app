import { initializeApp } from "firebase/app";
import {
  MessagePayload,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import firebaseConfig from "./firebase.config";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      return getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY_FCM,
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token", currentToken);
          } else {
            console.log("Failed to generate the app regitration token.");
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  });
}

requestPermission();

export const onMessageListener = () => {
  return new Promise((reslove: (payload: MessagePayload) => void) => {
    onMessage(messaging, (payload) => {
      console.log("Message Payload", payload);
      reslove(payload);
    });
  });
};
