// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXsRUhMqjsndjTMHTWfHUVjzXlJ3VHFQo",
  authDomain: "smart-productivity-dashb-5e5f6.firebaseapp.com",
  projectId: "smart-productivity-dashb-5e5f6",
  storageBucket: "smart-productivity-dashb-5e5f6.firebasestorage.app",
  messagingSenderId: "736028171615",
  appId: "1:736028171615:web:df7973f8c9cfbe85c6eaea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);