/**
 * This module provides a function to add bindings to Firestore.
 * 
 * @module addBindingsToFirestore
 */

import { createDocument } from './getDocs';

/**
 * Asynchronously adds an array of bindings to Firestore.
 * 
 * @async
 * @function addBindingsToFirestore
 * @param {Object[]} bindings - An array of binding objects to be added to Firestore.
 * Each binding object should have the following properties:
 * - firstName: The first name of the person.
 * - lastName: The last name of the person.
 * - ... (other properties of the binding object)
 * 
 * @example
 * const bindings = [
 *   {
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     // other properties...
 *   },
 *   // other bindings...
 * ];
 * await addBindingsToFirestore(bindings);
 * 
 * @returns {Promise} A Promise that resolves when all bindings have been added to Firestore.
 * If there's an error while adding a binding, it logs the error and the name of the person for whom the binding was being added.
 */
async function addBindingsToFirestore(bindings) { 
    for (const binding of bindings) {
        try {
          await createDocument('bindings', binding, 'bindingIDTracker');
          // console.log(`Successfully added binding for ${binding.firstName} ${binding.lastName}`);
        } catch (error) {
          // console.error(`Error adding binding for ${binding.firstName} ${binding.lastName}`, error);
        }
      }
};

export { addBindingsToFirestore };