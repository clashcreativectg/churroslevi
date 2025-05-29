// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCohqbsOhJq8xhPzbLGvJCHzTnWIu0mQDk",
  authDomain: "churros-levi.firebaseapp.com",
  projectId: "churros-levi",
  storageBucket: "churros-levi.firebasestorage.app",
  messagingSenderId: "509825412186",
  appId: "1:509825412186:web:7c665e2d44ab916d277c63"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
