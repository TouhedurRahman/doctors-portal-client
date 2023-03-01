// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAH7P--hTBiRehyTpCW6EDhjYoZqJ0HVQA",
    authDomain: "doctors-portal-dpweb.firebaseapp.com",
    projectId: "doctors-portal-dpweb",
    storageBucket: "doctors-portal-dpweb.appspot.com",
    messagingSenderId: "872053139230",
    appId: "1:872053139230:web:ffecd41d845d07d7764b0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;