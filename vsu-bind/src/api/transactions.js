import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import db from "../firebase-config";
import saveNewDocumentWithNumericId from "./helper";

const fetchTransactions = async () => {
  const transactionsCol = collection(db, "transactions");
  const dataSnapshot = await getDocs(transactionsCol);
  const dataList = dataSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return dataList;
};

const createTransaction = async (transaction) => {
  return saveNewDocumentWithNumericId("transactions", transaction);
};

export { fetchTransactions, createTransaction };
