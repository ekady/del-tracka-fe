import { initializeApp, FirebaseApp } from 'firebase/app';
import { Messaging, getMessaging, getToken } from 'firebase/messaging';
import localforage from 'localforage';

export interface IFirebaseCloudMessagin {
  token: string | null;
  app: FirebaseApp | null;
  messaging: Messaging | null;
}

const firebaseCloudMessaging = {
  init: async (): Promise<IFirebaseCloudMessagin> => {
    // Initialize the Firebase app with the credentials
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    });

    try {
      const messaging = getMessaging(app);
      const tokenInLocalForage = await localforage.getItem('fcm_token');

      // Return the token if it is already in our local storage
      if (tokenInLocalForage !== null) {
        return { token: tokenInLocalForage as string, app, messaging };
      }
      // Get new token from Firebase
      const fcmToken = await getToken(messaging);

      // Set token in our local storage
      if (fcmToken) {
        await localforage.setItem('fcm_token', fcmToken);
        return { token: fcmToken, app, messaging };
      }

      return { token: null, app: null, messaging: null };
    } catch (err) {
      return { token: null, app: null, messaging: null };
    }
  },
};
export { firebaseCloudMessaging };
