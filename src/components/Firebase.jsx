import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore } from 'firebase/firestore';
 


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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)