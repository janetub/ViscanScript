import { setDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore();

export const saveUserInfo = async (userInfo, collection) => {
  // Save user info in the specified collection
  try {
    const userDoc = doc(db, collection, userInfo.uid);
    await setDoc(userDoc, userInfo);
  } catch (error) {
    console.error("Error saving user info:", error);
  }
};
