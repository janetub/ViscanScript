/**
 * 
 */

/**
 * 
 * @param {*} userId 
 * @returns a unique ID for the entry
 */
export function generateUniqueId(userId) {
    const timestamp = Date.now();
    return `${userId}-${timestamp}`;
}