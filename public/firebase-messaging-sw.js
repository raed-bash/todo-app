if ("undefined" === typeof window) {
  importScripts(
    "https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js"
  );

  importScripts(
    "https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js"
  );
  const firebaseConfig = {
    apiKey: "AIzaSyBgYWSMf_MYKt6sMxlZ1eMRpL79Pk3sJbg",
    authDomain: "messaging-e517f.firebaseapp.com",
    projectId: "messaging-e517f",
    storageBucket: "messaging-e517f.appspot.com",
    messagingSenderId: "903630774128",
    appId: "1:903630774128:web:af39dbabee53aab99c79b5",
    measurementId: "G-E6YNWVC27X",
  };

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload?.notification?.title;
    const notificationOptions = { body: payload?.notification?.body };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
