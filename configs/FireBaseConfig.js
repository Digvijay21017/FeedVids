// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import getStorage from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "feedvids-59ce7.firebaseapp.com",
  projectId: "feedvids-59ce7",
  storageBucket: "feedvids-59ce7.firebasestorage.app",
  messagingSenderId: "825737818328",
  appId: "1:825737818328:web:9cd041de0c8801647a67ad",
  measurementId: "G-0C3SBSNKN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);