// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC0WrV4tkr2W7lHhzW9gehpBEJ-8yErbl0",
  authDomain: "expense-tracker-678f8.firebaseapp.com",
  projectId: "expense-tracker-678f8",
  storageBucket: "expense-tracker-678f8.appspot.com",
  messagingSenderId: "1021313785536",
  appId: "1:1021313785536:web:8de29103f9e9b5e06c5725",
  measurementId: "G-NME5PSP1D7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);