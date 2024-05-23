import { db } from "@/utils/firebaseConfig";
import saveNewDocumentWithNumericId from "./helper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getDocsFromCache,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { format } from "date-fns";

const updateOperatingSchedule  = async (selectedDates) => {
  try {
    const scheduleCol = collection(db, "operatingSchedule");
    const q = query(scheduleCol, where("enabled", "==", true));
    const querySnapshot = await getDocs(q);
    const enabledDates = querySnapshot.docs.map((doc) => doc.id);
    const datesToDisable = enabledDates.filter(date => !selectedDates.includes(date));

    console.log("Enabled dates:", enabledDates);
    console.log("Dates to disable:", datesToDisable);

    for (const date of datesToDisable) {
      const scheduleRef = doc(db, "operatingSchedule", date);
      const scheduleDoc = await getDoc(scheduleRef);

      if (scheduleDoc.exists()) {
        const data = scheduleDoc.data();
        console.log("Existing data for date:", date, data);
        if (data.lastPriorityNum > 0) {
          const result = await Swal.fire({
            icon: "warning",
            title: "Warning",
            text: `The date ${date} has existing appointments. Do you still want to disable it?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          });

          if (result.isConfirmed) {
            await setDoc(scheduleRef, {
              ...data,
              enabled: false,
            });
          }
        } else {
          await setDoc(scheduleRef, {
            ...data,
            enabled: false,
          });
        }
      }
    }

    for (const date of selectedDates) {
      const formattedDate = format(date, "yyyy-MM-dd");
      const scheduleRef = doc(db, "operatingSchedule", formattedDate);
      console.log("Enabling date:", formattedDate);
      const scheduleDoc = await getDoc(scheduleRef);

      if (scheduleDoc.exists()) {
        const data = scheduleDoc.data();
        console.log("Existing data for date:", formattedDate, data);
        await setDoc(scheduleRef, {
          ...data,
          lastPriorityNum: data.lastPriorityNum || 0,
          enabled: true,
        });
      } else {
        await setDoc(scheduleRef, {
          lastPriorityNum: 0,
          enabled: true,
        });
        console.log("New date enabled:", formattedDate);
      }
    }
  } catch (error) {
    console.error("Error updating operation Dates: ", error);
  }
};

const fetchLatestOperationDates = async () => {
  try {
    const scheduleCol = collection(db, "operatingSchedule");
    const q = query(scheduleCol, where("enabled", "==", true));
    const querySnapshot = await getDocs(q);

    const enabledDates = [];
    querySnapshot.forEach((doc) => {
      enabledDates.push(doc.id);
    });

    return enabledDates;
  } catch (error) {
    console.error("Error fetching operation dates: ", error);
  }
};

export { updateOperatingSchedule , fetchLatestOperationDates };
