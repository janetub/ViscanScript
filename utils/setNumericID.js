/**
 * app/utils/idTracker.js
 * 
 * NOTE:
 * idTracker contains numeric ids
 * if a new entry is added to collectionName, the last id from idTracker is incremented and
 * assigned to the new entry and then adds the same id to idTracker to keep generaing unique
 * inumeric ids
 * new entry in collectionName is added an id field containing the unique numeric id
 * currently not needed since students and staff have unique university id
 */

import { Firestore, collection, doc, runTransaction } from "firebase/firestore";
import { db } from './firebaseConfig';

/**
 * Saves a new document with numeric ID based off from ID tracker collection to be saved to target collection.
 * 
 * @param {string} collectionName - Target collection where new doc will be addded.
 * @param {Object} newDocumentData - Doc that will be added to target collection.
 * @param {string} idTrackerCollectionName - Collection that keeps the numeric IDs and basis for new generated ID.
 * @returns {Firestore document} A reference to the new document in target collection.
 */
async function saveNewDocumentWithNumericId(
  collectionName,
  newDocumentData,
  idTrackerCollectionName = "idTrackers",
) {
  const idTrackerRef = doc(db, idTrackerCollectionName, collectionName);
  const newDocRef = doc(collection(db, collectionName));

  try {
    await runTransaction(db, async (transaction) => {
      const idTrackerDoc = await transaction.get(idTrackerRef);
      const newID = (idTrackerDoc.data()?.lastId || 0) + 1;

      if(typeof newID !== 'number') {
        throw new Error("Retrieved ID is non-numeric.");
      }

      transaction.set(idTrackerRef, { lastId: newID });

      const newDocDataWithId = { ...newDocumentData, id: newID };

      transaction.set(newDocRef, newDocDataWithId);
    });

    return newDocRef;
  } catch (error) {
    console.error(`Transaction failed in collection ${collectionName}: `, error);
    throw new Error(`Failed to save new document with numeric ID in collection ${collectionName}.`);
  }
}

export default saveNewDocumentWithNumericId;