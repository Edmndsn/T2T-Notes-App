import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDqz_jtMS1iGk9UhE_ld99RDVfbb73eOdQ",
  authDomain: "dbest-note-app-3eee6.firebaseapp.com",
  projectId: "dbest-note-app-3eee6",
  storageBucket: "dbest-note-app-3eee6.appspot.com",
  messagingSenderId: "575116228337",
  appId: "1:575116228337:web:2922ae604fec1c63bf5b50",
  measurementId: "G-EBY0E5LSD6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const gProvider = new GoogleAuthProvider();
export const fProvider = new FacebookAuthProvider();
