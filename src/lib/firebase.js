import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const requiredKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

const missingKeys = requiredKeys.filter((key) => !import.meta.env[key]);
export const isFirebaseConfigured = missingKeys.length === 0;

if (!isFirebaseConfigured) {
  console.error('Missing Firebase env vars:', missingKeys.join(', '));
  console.warn('Firebase is disabled. Portfolio will run without live auth features.');
}

const firebaseConfig = isFirebaseConfigured
  ? {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    }
  : null;

export const firebaseApp = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const firebaseAuth = isFirebaseConfigured ? getAuth(firebaseApp) : null;
export const firebaseDB = isFirebaseConfigured ? getFirestore(firebaseApp) : null;

export let firebaseAnalytics = null;

if (isFirebaseConfigured && typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported && firebaseConfig.measurementId) {
        firebaseAnalytics = getAnalytics(firebaseApp);
      }
    })
    .catch(() => {
      firebaseAnalytics = null;
    });
}