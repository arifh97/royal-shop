// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAv8cCmTj0xFgBLFkDKIEHmIBOEXGlui_Y",
    authDomain: "royal-shop-5959a.firebaseapp.com",
    projectId: "royal-shop-5959a",
    storageBucket: "royal-shop-5959a.appspot.com",
    messagingSenderId: "953991624546",
    appId: "1:953991624546:web:aae9a900692db0a3325e3b",
    measurementId: "G-XS28S20PV6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };