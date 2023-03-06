// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbnEPPzuI7D2cSIwz5tOpLSfXZqIeLtko",
  authDomain: "chatapp-33f19.firebaseapp.com",
  projectId: "chatapp-33f19",
  storageBucket: "chatapp-33f19.appspot.com",
  messagingSenderId: "460901479094",
  appId: "1:460901479094:web:5ee76f30eb6a1826d62c17",
  measurementId: "G-XKHG8FDPBV"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)