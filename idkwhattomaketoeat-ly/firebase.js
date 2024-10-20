import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { REACT_APP_FIREBASE_API_KEY } from '@env';

// firebase config
const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: "idkwhattomaketoeat-ly.firebaseapp.com",
    projectId: "idkwhattomaketoeat-ly",
    storageBucket: "idkwhattomaketoeat-ly.appspot.com",
    messagingSenderId: "388937428143",
    appId: "1:388937428143:web:359b2078161c3e5090385a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// Initialize Cloud Firestore and get a reference to the service
export const auth = getAuth(app)
export const db = getFirestore(app)

