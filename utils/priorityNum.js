import { collection, doc, getDocs, query, orderBy, limit, updateDoc, where } from 'firebase/firestore';

// TODO: proper documentation, add to documentation the argument formats
// Function to restart priority numbers of certain statuses
export async function restartPriorityNumbers(db, statuses, isIncludedStatuses, appointmentDate, desiredDate, maxDocuments) {
    const bindingsRef = collection(db, 'bindings');
    let bindingsQuery = query(bindingsRef, orderBy('appointmentDate'), orderBy('priorityNum'));

    // Filter by status and appointmentDate
    if (statuses && statuses.length > 0) {
        if(isIncludedStatuses){
            bindingsQuery = query(bindingsQuery, where('status', 'in', statuses));
        } else {
            bindingsQuery = query(bindingsQuery, where('status', 'not-in', statuses));
        }
        
    }
    if (appointmentDate && appointmentDate.length > 0) {
        bindingsQuery = query(bindingsQuery, where('appointmentDate', 'in', appointmentDate));
    }

    // Limit the number of documents
    if (maxDocuments) {
        bindingsQuery = query(bindingsQuery, limit(maxDocuments));
    }

    const bindingsSnapshot = await getDocs(bindingsQuery);
    let newPriority = 1;
    bindingsSnapshot.docs.forEach((doc) => {
        updateDoc(doc.ref, { priorityNum: newPriority++, appointmentDate: desiredDate });
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
    const collectionRef = collection(db, 'bindings');
    const queryRef = query(collectionRef, where('appointmentDate', '==', date));

    const snapshot = await getDocs(queryRef);
    if (snapshot.empty) {
        return 1;
    }

    let highestPriorityNum = 0;
    snapshot.docs.forEach(doc => {
        const priorityNum = doc.data().priorityNum;
        if (priorityNum > highestPriorityNum) {
            highestPriorityNum = priorityNum;
        }
    });

    return highestPriorityNum + 1;
}

export async function cleanPriorityNumbers(db, date) {
    const collectionRef = collection(db, 'bindings');
        let queryRef = query(collectionRef, orderBy('appointmentDate'), orderBy('priorityNum'));

        const snapshot = await getDocs(queryRef);
        let expectedPriority = 1;

        snapshot.docs.forEach(async (doc) => {
            const actualPriority = docData.priorityNum;

            // If the actual priority does not match the expected priority, update it
            if (actualPriority !== expectedPriority) {
                await updateDoc(doc.ref, { priorityNum: expectedPriority });
            }

            expectedPriority++;
        });
}