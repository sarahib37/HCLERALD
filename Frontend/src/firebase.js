// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGX58RvlShT6DG9ixVYWQKNHAiEyCps5A",
  authDomain: "hclerald-94767.firebaseapp.com",
  projectId: "hclerald-94767",
  storageBucket: "hclerald-94767.firebasestorage.app",
  messagingSenderId: "361670236878",
  appId: "1:361670236878:web:41a50d2413fdf93a81ce9f",
  measurementId: "G-ZVQ8NWC74X",
  clientId: '361670236878-3bd5rsrm6ac6ir2iiph7eu1kt2fdqmpj.apps.googleusercontent.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);