import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Added for Login/Register
import { getFirestore } from "firebase/firestore"; // Added for Database

const firebaseConfig = {
  apiKey: "AIzaSyAdP2Ifheihh-MW9HXzWKpw0nEqQ_6sarA",
  authDomain: "juniorquizlive.firebaseapp.com",
  databaseURL: "https://juniorquizlive-default-rtdb.firebaseio.com",
  projectId: "juniorquizlive",
  storageBucket: "juniorquizlive.firebasestorage.app",
  messagingSenderId: "297942978278",
  appId: "1:297942978278:web:dc0e05daa95a2dbdb7f527",
  measurementId: "G-ZGN7GS6CTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export these so your Register page can use them
export const auth = getAuth(app);
export const db = getFirestore(app);
