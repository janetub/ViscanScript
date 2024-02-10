import { collection, doc, runTransaction } from "firebase/firestore";
import db from "../firebase-config";

const saveNewDocumentWithNumericId = async (
  collectionName,
  newDocumentData,
) => {
  const idTrackerRef = doc(db, "idTrackers", collectionName);
  const newDocRef = doc(collection(db, collectionName));

  try {
    await runTransaction(db, async (transaction) => {
      // Get the current numeric ID from the tracker
      const idTrackerDoc = await transaction.get(idTrackerRef);
      const newId = (idTrackerDoc.data()?.lastId || 0) + 1;

      // Set the new ID in the tracker
      transaction.set(idTrackerRef, { lastId: newId });

      // Add the new ID to the document data
      const newDocDataWithId = { ...newDocumentData, id: newId };

      // Save the new document with the numeric ID
      transaction.set(newDocRef, newDocDataWithId);
    });

    return newDocRef;
  } catch (error) {
    console.error("Transaction failed: ", error);
    throw new Error("Failed to save new document with numeric ID.");
  }
};

export default saveNewDocumentWithNumericId;
