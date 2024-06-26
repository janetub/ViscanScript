import React, { useState } from "react";
import BindingDetails from "./BindingDetails";
import BindingTable from "./BindingTable";
import { getNextStatus } from "./BindingOrderTabs";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";

function BindingManagement({
  selectedTab,
  showDetails,
  handleOpen,
  handleClose,
  selectedBinding,
  setSelectedTab,
}) {

  const [selectedApptDate, setSelectedApptDate] = useState(format(new Date(), "yyyy-MM-dd")); 
  const [reloadKey, setReloadKey] = useState(0); 
  
  const onClose = () => {
    setReloadKey(prevKey => prevKey + 1);
    handleClose(); 
  };

  return (
    <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col px-4 py-5 w-full bg-sky-100 rounded-xl max-md:mt-5 max-md:max-w-full">
        <div className="justify-center items-start py-2 pl-4 text-base font-medium bg-white rounded-xl text-neutral-800 max-md:pr-5 max-md:max-w-full">
          <div className="flex items-center gap-2">
              <button>Binding Requests for </button>
              <ReactDatePicker
              className="w-[50%] text-gray-700 font-bold whitespace-nowrap"
              selected={selectedApptDate}
              onChange={(date) => {
                const formattedDate = format(date, "yyyy-MM-dd");
                setSelectedApptDate(formattedDate);
              }}
              placeholderText="Select Appointment Date"
              // utcOffset={8}
            />
          </div>
          <div className="flex flex-col px-5 pt-5 mt-4 bg-white rounded-xl max-md:max-w-full">
            <div className="pb-2.5 mb-4 max-md:max-w-full">
              <div className="flex gap-0  max-md:flex-col max-md:gap-0 max-md: ">
                <BindingTable
                  key={reloadKey}
                  toggleShowDetails={handleOpen}
                  collectionName="bindings"
                  bindingOrderStatus={selectedTab !== "all" ? selectedTab : null}
                  selectedApptDate={selectedApptDate}
                  reloadKey={reloadKey}
                />
                {showDetails && (
                  <BindingDetails binding={selectedBinding} onClose={onClose} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BindingManagement;
