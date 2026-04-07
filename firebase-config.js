// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
