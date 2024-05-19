import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * Asynchronously updates the status of a binding in Firestore.
 *
 * @async
 * @function updateBindingStatus
 * @param {string} bindingID - The ID of the binding to be updated.
 * @param {string} status - The new status to be set for the binding.
 *
 * @example
 * const bindingID = '123456';
 * const status = 'completed';
 * await updateBindingStatus(bindingID, status);
 *
 * @returns {Promise} A Promise that resolves when the status of the binding has been updated in Firestore.
 * If there's an error while updating the status, it logs the error and the ID of the binding for which the status was being updated.
 */
async function updateBindingStatus(bindingID, status) {
  try {
    await updateDocument("bindings", bindingID, { status });
    console.log(`Successfully updated status for binding ${bindingID}`);
  } catch (error) {
    console.error(`Error updating status for binding ${bindingID}`, error);
  }
}

/**
 * Asynchronously updates a document in Firestore.
 *
 * @async
 * @function updateDocument
 * @param {string} collection - The name of the collection where the document is located.
 * @param {string} documentID - The ID of the document to be updated.
 * @param {Object} data - The new data to be set for the document.
 *
 * @example
 * const collection = 'bindings';
 * const documentID = '123456';
 * const data = { status: 'completed' };
 * await updateDocument(collection, documentID, data);
 *
 * @returns {Promise} A Promise that resolves when the document has been updated in Firestore.
 * If there's an error while updating the document, it logs the error and the ID of the document for which the update was being made.
 */

async function updateDocument(collection, documentID, data) {
  try {
    const docRef = doc(db, collection, documentID);
    await updateDoc(docRef, data);
    console.log(
      `Successfully updated document ${documentID} in collection ${collection}`,
    );
  } catch (error) {
    console.error(
      `Error updating document ${documentID} in collection ${collection}`,
      error,
    );
  }
}

export { updateBindingStatus };
