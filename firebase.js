// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {

    apiKey: "AIzaSyBxKCngmA3JXmazWLxTIZ18_1TZzWCkGaQ",

    authDomain: "summer-event-f7ae3.firebaseapp.com",

    projectId: "summer-event-f7ae3",

    storageBucket: "summer-event-f7ae3.firebasestorage.app",

    messagingSenderId: "112020755094",

    appId: "1:112020755094:web:c8a534f947cdec200428b7"

};

// Firebase 시작
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

export { db };
