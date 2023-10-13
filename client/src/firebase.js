// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernestate-e9c6f.firebaseapp.com",
  projectId: "mernestate-e9c6f",
  storageBucket: "mernestate-e9c6f.appspot.com",
  messagingSenderId: "847127800516",
  appId: "1:847127800516:web:de045a434f41c8ba847791"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);