import { collection, doc, getDocs, query, orderBy, limit, updateDoc, where, getDoc } from 'firebase/firestore';

// TODO: proper documentation, add to documentation the argument formats
// Function to restart priority numbers of certain statuses
export async function restartPriorityNumbers(db, statuses, isIncludedStatuses, apptDate, desiredDate, maxDocuments) {
    const bindingsRef = collection(db, 'bindings');
    let bindingsQuery = query(bindingsRef, orderBy('apptDate'), orderBy('priorityNum'));

    // Filter by status and apptDate
    if (statuses && statuses.length > 0) {
        if(isIncludedStatuses){
            bindingsQuery = query(bindingsQuery, where('status', 'in', statuses));
        } else {
            bindingsQuery = query(bindingsQuery, where('status', 'not-in', statuses));
        }
        
    }
    if (apptDate && apptDate.length > 0) {
        bindingsQuery = query(bindingsQuery, where('apptDate', 'in', apptDate));
    }

    // Limit the number of documents
    if (maxDocuments) {
        bindingsQuery = query(bindingsQuery, limit(maxDocuments));
    }

    const bindingsSnapshot = await getDocs(bindingsQuery);
    let newPriority = 1;
    bindingsSnapshot.docs.forEach((doc) => {
        updateDoc(doc.ref, { priorityNum: newPriority++, apptDate: desiredDate });
    });
}

export async function printCollectedData(data) {
    data.forEach((item) => {
        console.log(item);
    });
}

// Function to count documents by certain fields with certain values across multiple collections
export async function countData(db, collectionNames, fields, values) {
    let totalCount = 0;

    // Loop through each collection
    for (const collectionName of collectionNames) {
        const collectionRef = collection(db, collectionName);

        // Create a query for each field-value pair
        let queries = [];
        fields.forEach((field, index) => {
            queries.push(where(field, '==', values[index]));
        });

        // Combine all queries
        const combinedQuery = query(collectionRef, ...queries);

        // Get documents and update the total count
        const snapshot = await getDocs(combinedQuery);
        totalCount += snapshot.size;
    }

    return totalCount;
}

export async function assignPriorityNum(db, date) {
    try {
        const scheduleDocRef = doc(db, 'operatingSchedule', date);
        const scheduleDoc = await getDoc(scheduleDocRef);

        if (!scheduleDoc.exists()) {
            return 1;
        }

        const scheduleData = scheduleDoc.data();
        const lastPriorityNum = scheduleData.lastPriorityNum || 0;

        return lastPriorityNum + 1;
    } catch (error) {
        console.error("Error assigning priority number: ", error);
        throw error;
    }
}
export async function cleanPriorityNumbers(db, date) {
    const collectionRef = collection(db, 'bindings');
        let queryRef = query(collectionRef, orderBy('apptDate'), orderBy('priorityNum'));

        const snapshot = await getDocs(queryRef);
        let expectedPriority = 1;

        snapshot.docs.forEach(async (doc) => {
            const actualPriority = docData.priorityNum;

            if (actualPriority !== expectedPriority) {
                await updateDoc(doc.ref, { priorityNum: expectedPriority });
            }

            expectedPriority++;
        });
}
