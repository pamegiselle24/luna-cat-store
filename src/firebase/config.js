import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR_mgSGzxIz50RoaggiMZKAk_mCDhPZUo",
  authDomain: "mi-ecommerce-pet.firebaseapp.com",
  projectId: "mi-ecommerce-pet",
  storageBucket: "mi-ecommerce-pet.firebasestorage.app",
  messagingSenderId: "420804413508",
  appId: "1:420804413508:web:c72a8dd486204b3473d411",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
