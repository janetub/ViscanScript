import { db } from "@/utils/firebaseConfig";
import saveNewDocumentWithNumericId from "./helper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getDocsFromCache,
  query,
  where,
} from "firebase/firestore";

const updateOperationDate = async (dates) => {
  try {
    return saveNewDocumentWithNumericId("operationDates", { dates });
  } catch (error) {
    console.error("Error updating operation Dates: ", error);
  }
};

const fetchLatestOperationDate = async () => {
  try {
    const idTrackerRef = doc(db, "idTrackers", "operationDates");

    const idTrackerDoc = await getDoc(idTrackerRef);

    if (idTrackerDoc.exists()) {
      console.log("Document data:", idTrackerDoc.data());
      const lastId = idTrackerDoc.data().lastId;

      const operationDatesCol = collection(db, "operationDates");
      const q = query(operationDatesCol, where("id", "==", lastId));

      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching operation dates: ", error);
  }
};

export { updateOperationDate, fetchLatestOperationDate };
