// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFln98Q6U2AiVRoD8csbVydz4RSylTTa4",
  authDomain: "tjc-lk.firebaseapp.com",
  projectId: "tjc-lk",
  storageBucket: "tjc-lk.firebasestorage.app",
  messagingSenderId: "63744762399",
  appId: "1:63744762399:web:82bdfdb0056025395a6b2a",
  measurementId: "G-74V0N7V1WC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
