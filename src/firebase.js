// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDNQJohsLO-0m48ohKnlMbG6EyUhd-GXsU",
    authDomain: "club-visita.firebaseapp.com",
    databaseURL: "https://club-visita.firebaseio.com",
    projectId: "club-visita",
    storageBucket: "club-visita.appspot.com",
    messagingSenderId: "952125345006",
    appId: "1:952125345006:web:916b588c867040375d37ff",
    measurementId: "G-4H3ZCXM2G1"  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;