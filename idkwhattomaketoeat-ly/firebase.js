import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAj7WOb3P7R8GuDpDLUIUYeF6mEMG-6VJ0",
    authDomain: "idkwhattomaketoeat-ly.firebaseapp.com",
    projectId: "idkwhattomaketoeat-ly",
    storageBucket: "idkwhattomaketoeat-ly.appspot.com",
    messagingSenderId: "388937428143",
    appId: "1:388937428143:web:359b2078161c3e5090385a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const auth = getAuth(app)
export const db = getFirestore(app)