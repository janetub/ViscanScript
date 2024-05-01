/**
 * utils/getDocs.js
 * 
 * NOTE: Firestore creates collection when writing data on nonexistent collection,
 * but returns empty array when reading a nonexistent collection.
 * 
 */

import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig';
import saveNewDocumentWithNumericId from "./setNumericID";

/**
 * Gets the docs of specified collection.
 * 
 * @param {*} collectionName - Firebase collection where docs are retrieved from
 * @returns {dataList} documents, empty if collection does not exist or empty
 */
const fetchCollectionData = async (collectionName) => {
    try {
        const collectionRef = collection(db, collectionName);
        const dataSnapshot = await getDocs(collectionRef);

        if (!dataSnapshot.empty) {
            const dataList = dataSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));

            return dataList;
        } else {
            // console.log(`No documents found in collection: ${collectionName}`);
            return [];
        }
    } catch (error) {
        console.error(`Error fetching documents from collection: ${collectionName}`, error);
        throw error;
    }
};

/**
 * 
 * @param {string} collectionName - Target collection where new doc will be addded.
 * @param {Object} newDocumentData - Doc that will be added to target collection.
 * @param {string} idTrackerCollectionName - Collection that keeps the numeric IDs and basis for new generated ID.
 * @returns {Firestore document} A reference to the new document in target collection.
 */
const createDocument = async (collectionName, newDocumentData, idTrackerCollectionName) => {
    return saveNewDocumentWithNumericId(collectionName, newDocumentData, idTrackerCollectionName);
};

export { fetchCollectionData, createDocument };
  