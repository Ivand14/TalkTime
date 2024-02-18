// Import the functions you need from the SDKs you need

import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCLDVFJc5HG97AH9Eo_KVOfYuHgS7WmeT8",
  authDomain: "pruebatecnica-24f71.firebaseapp.com",
  projectId: "pruebatecnica-24f71",
  storageBucket: "pruebatecnica-24f71.appspot.com",
  messagingSenderId: "544611519320",
  appId: "1:544611519320:web:ea126031872867dd91b32d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

