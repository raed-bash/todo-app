import { initializeApp } from "firebase/app";
import {
  MessagePayload,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import firebaseConfig from "./firebase.config";
import { axiosInstance } from "src/app/axios";
import { endPoint } from "src/utils/endpoint";

// Push notifications are optional: skip Firebase when it isn't configured (e.g. local dev).
const messaging = firebaseConfig.projectId
  ? getMessaging(initializeApp(firebaseConfig))
  : null;

export function requestPermission() {
  if (!messaging) return;
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      return getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY_FCM,
      })
        .then((currentToken) => {
          if (currentToken) {
            axiosInstance
              .post(endPoint("notification", "token"), {
                notificationToken: currentToken,
              })
              .then(() => {})
              .catch((err) => {});
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

export const onMessageListener = () => {
  return new Promise((reslove: (payload: MessagePayload) => void) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => {
      reslove(payload);
    });
  });
};
