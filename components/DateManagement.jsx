import {
  fetchLatestOperationDate,
  updateOperationDate,
} from "@/api/operationDate";
import { isWeekend } from "date-fns";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";

export default function DateManagement() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { dates } = (await fetchLatestOperationDate())[0];
      const formattedDates = dates.map((date) => new Date(date.seconds * 1000));
      console.log("Formatted Dates: ", formattedDates);
      if (dates) {
        setSelectedDates(formattedDates);
      }
    };
    fetchData();
  }, []);

  const onChange = (dates) => {
    setSelectedDates(dates);
  };

  const handleSaveDates = async () => {
    setIsSaving(true);
    await updateOperationDate(selectedDates);
    setIsSaving(false);

    Swal.fire({
      icon: "success",
      title: "Operation Dates Updated",

      showConfirmButton: true,
    });
  };

  return (
    <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col px-4 py-5 w-full bg-sky-100 rounded-xl max-md:mt-5 max-md:max-w-full">
        <div className="justify-center items-start py-2 pl-4 text-base font-medium bg-white rounded-xl text-neutral-800 max-md:pr-5 max-md:max-w-full">
          <button>Binding Requests</button>{" "}
          {/* onClick={addBindings} For testing */}
        </div>
        <div className="flex flex-col px-5 pt-5 mt-4 bg-white rounded-xl max-md:max-w-full">
          <div className="pb-2.5 mb-4 max-md:max-w-full">
            <div className="flex gap-0  max-md:flex-col max-md:gap-0 max-md: ">
              <ReactDatePicker
                selectedDates={selectedDates}
                selectsMultiple
                onChange={onChange}
                inline
                filterDate={(date) => !isWeekend(date)}
                wrapperClassName="w-full"
              />
            </div>
            <button
              className="grow justify-center px-5 py-3 bg-sky-500 rounded text-white"
              onClick={handleSaveDates}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Dates"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
