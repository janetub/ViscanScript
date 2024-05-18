/*
  app/utils/firebaseConfig.js
*/

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlWJPztI1TyQ2FxdoeSPp3mgMStPfy3lA",
  authDomain: "fir-viscanscript-27ecc.firebaseapp.com",
  projectId: "fir-viscanscript-27ecc",
  storageBucket: "fir-viscanscript-27ecc.appspot.com",
  messagingSenderId: "407668063166",
  appId: "1:407668063166:web:1811db8b690e310736d7ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };