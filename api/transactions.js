import { collection, getDocs } from "firebase/firestore";
import saveNewDocumentWithNumericId from "./helper";
import { db } from "../utils/firebaseConfig";

async function fetchTransactions() {
  try {
    const transactionsCol = collection(db, "transactions");
    const dataSnapshot = await getDocs(transactionsCol);
    const dataList = dataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return dataList;
  } catch (error) {
    console.error("Error fetching transactions: ", error);
  }
};

const createTransaction = async (transaction) => {
  try {
    return saveNewDocumentWithNumericId("transactions", transaction);
  } catch (error) {
    console.error("Error creating transaction: ", error);
  }
};

export { fetchTransactions, createTransaction };
