/*
    utils/userUtils.js
    This file contains utility functions for user-related operations in Firestore.
*/

import { db } from './firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

/**
 * Prints all user entries in the specified collection.
 * @param {string} collectionName - The name of the Firestore collection to print user entries from.
 * @returns {void}
 */
export const printUserEntries = async (collectionName) => {
    try {
        const usersCollection = collection(db, collectionName);
        const querySnapshot = await getDocs(usersCollection);
        querySnapshot.forEach((doc) => {
            // console.log('Document data:', doc.data());
        });
    } catch (error) {
        console.error('Error printing user entries:', error);
    }
};

/**
 * Checks if a user with the specified email exists in the specified collection.
 * @param {string} email - The email of the user to check for existence.
 * @param {string} collectionName - The name of the Firestore collection to search for the user.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the user exists, false otherwise.
 */
export const checkIfUserExists = async (email, collectionName) => {
    try {
        const usersCollection = collection(db, collectionName);
        const usersQuery = query(usersCollection, where('email', '==', email));
        const querySnapshot = await getDocs(usersQuery);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        return false;
    }
};

/**
 * Checks if a user with the specified email exists in any of the specified collections.
 * @param {string} email - The email of the user to check for existence.
 * @param {string[]} collectionNames - An array of collection names to search for the user.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the user exists in any collection, false otherwise.
 */
export const checkIfEmailExistsInCollections = async (email, collectionNames) => {
    try {
        for (const collectionName of collectionNames) {
            const exists = await checkIfUserExists(email, collectionName);
            if (exists) return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking if email exists in collections:', error);
        return false;
    }
};