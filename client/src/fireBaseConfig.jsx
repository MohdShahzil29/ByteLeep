// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQOs-3w0Y_3u6rV7nu9WSFQ5hRILj5vUc",
  authDomain: "study-platform-cc4b1.firebaseapp.com",
  projectId: "study-platform-cc4b1",
  storageBucket: "study-platform-cc4b1.firebasestorage.app",
  messagingSenderId: "716904354896",
  appId: "1:716904354896:web:56002ea4acc06116486d55",
  measurementId: "G-9RJDK5QQ1S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
