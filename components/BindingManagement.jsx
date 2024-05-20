import React from "react";
import BindingDetails from "./BindingDetails";
import BindingTable from "./BindingTable";
import { getNextStatus } from "./BindingOrderTabs";

function BindingManagement({
  selectedTab,
  showDetails,
  handleOpen,
  handleClose,
  selectedBinding,
  setSelectedTab,
}) {
  const onclose = () => {
    const nextStatus = getNextStatus(selectedBinding.status);

    console.log("nextStatus", nextStatus);
    setSelectedTab(nextStatus.status);
    handleClose();
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
              <BindingTable
                toggleShowDetails={handleOpen}
                collectionName="bindings"
                bindingOrderStatus={selectedTab !== "all" ? selectedTab : null}
              />
              {showDetails && (
                <BindingDetails binding={selectedBinding} onClose={onclose} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BindingManagement;
