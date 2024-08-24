// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDf5u5WWSHl-RqF8l8UlseOAAF_g2pp5E",
  authDomain: "expensify-b36f5.firebaseapp.com",
  projectId: "expensify-b36f5",
  storageBucket: "expensify-b36f5.appspot.com",
  messagingSenderId: "132731441776",
  appId: "1:132731441776:web:e1ee0c96f1414f0bff5ab5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;