import { doc, setDoc, getDoc, updateDoc, deleteDoc, onSnapshot, arrayUnion, FieldPath } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function createDocument(collection, document, data){
  try {
    const docRef = doc(db, collection, document);
    await setDoc(docRef, data);
  } catch (error) {
    console.error(`Error creating document`, error);
  }
};

export async function readDocument(collectionName, document){
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log(`No document found in ${collectionName} with id ${documentId}`);
    }
  } catch (error) {
      console.error(`Error fetching data from ${collectionName}`, error);
  }
};

export async function updateDocument(collection, document, data){
  try {
    const docRef = doc(db, collection, document);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`Error updating document`, error);
  }
};

export async function deleteDocument(collection, document){
  try {
    const docRef = doc(db, collection, document);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document`, error);
  }
};

export async function appendToArrayField(collectionName, documentId, fieldName, newElement) {
  const docRef = doc(db, collectionName, documentId);

  await updateDoc(docRef, { [fieldName]: arrayUnion(newElement) }, { merge: true });
};