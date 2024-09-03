// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-eea23.firebaseapp.com",
  projectId: "react-chat-eea23",
  storageBucket: "react-chat-eea23.appspot.com",
  messagingSenderId: "523764389512",
  appId: "1:523764389512:web:5fda02b600daa4b3cd313d",
  measurementId: "G-L8SRE5KYLW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
