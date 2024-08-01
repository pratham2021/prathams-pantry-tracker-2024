import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBNPaqYRmd8auoBOsghqa6uPL7re1reFZ8",
  authDomain: "pratham-s-pantry.firebaseapp.com",
  projectId: "pratham-s-pantry",
  storageBucket: "pratham-s-pantry.appspot.com",
  messagingSenderId: "144402643884",
  appId: "1:144402643884:web:8a59f1292f84f451f89809"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);