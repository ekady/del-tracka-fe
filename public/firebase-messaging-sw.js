importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBnbUI4afmYCjxheimq2JeP5kr_o-yAsV8',
  authDomain: 'tracka-25201.firebaseapp.com',
  projectId: 'tracka-25201',
  storageBucket: 'tracka-25201.appspot.com',
  messagingSenderId: '379921562960',
  appId: '1:379921562960:web:276534cf1c4c4e250f4055',
  measurementId: 'G-G44D203BVD',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
