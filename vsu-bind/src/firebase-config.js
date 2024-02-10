import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-o2B1bF_knVOOKO8jb8D_701tKq2ak38",
  authDomain: "vsu-bind.firebaseapp.com",
  projectId: "vsu-bind",
  storageBucket: "vsu-bind.appspot.com",
  messagingSenderId: "211263288290",
  appId: "1:211263288290:web:968f1c48b5137af1547fbb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;
