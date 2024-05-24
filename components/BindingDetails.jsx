/**
 * components/BindingDetails.jsx
 *
 * The side panel or preview pane containing detauls of the active or selected Binding Order Request
 *
 * attributions
 * <a href="https://www.flaticon.com/free-icons/attach" title="attach icons">Attach icons created by Freepik - Flaticon</a>
 */

import Image from "next/image";
import attachIcon from "@/public/images/attach.png";
import { bindingStatuses, getNextStatus } from "./BindingOrderTabs";
import Swal from "sweetalert2";
import { updateBindingStatus } from "@/utils/updateBindings";
import { useState } from "react";
import React from 'react';
import { updateDocument } from "@/utils/firestoreService";

BindingDetails.defaultProps = {
  binding: {
    ackID: "", 
    amount: 0, 
    apptDate: "", 
    bindID: "", 
    copies: 0, 
    docxFile: "", 
    email: "", 
    firstName: "", 
    idPhotoFile: "", 
    isClaimed: false, 
    isPaid: false, 
    lastName: "", 
    middleName: "", 
    orID: "",
    pdfFile: "", 
    priorityNum: 0, 
    programCode: "", 
    remarks: "", 
    requestDate: "",
    status: "", 
    studentNum: "",
    title: "", 
  },
};

export default function BindingDetails({ binding, onClose }) {
  const handleProceedNextStatus = async (status) => {
    const nextStatus = getNextStatus(status);

    if (nextStatus) {
      try {
        await updateBindingStatus(binding.id, nextStatus.status);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Binding status updated to ${nextStatus.status}`,
        });

        onClose();
      } catch (error) {
        console.error(`Error updating status for binding ${binding.id}`, error);
      }
    }
  };

  const [editableFields, setEditableFields] = useState({
    ackID: binding.ackID || "",
    bindID: binding.bindID || "",
    orID: binding.orID || "",
  });
  const [isEditable, setIsEditable] = useState(false);
  const [status, setStatus] = useState(binding.status);
  
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus); // Update the local state
    try {
      await updateDocument("bindings", binding.id, { status: newStatus }); // Save to Firestore
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Binding status updated to ${newStatus}`,
      });
      onClose();
    } catch (error) {
      console.error(`Error updating status for binding ${binding.id}`, error);
    }
  };

  const handleChangeID = (e) => {
    const { name, value } = e.target;
    setEditableFields({ ...editableFields, [name]: value });
  };

  const handleSaveIDChanges = async () => {
    try {
      await updateDocument("bindings", binding.id, {
        ackID: editableFields.ackID,
        bindID: editableFields.bindID,
        orID: editableFields.orID,
      });
  
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Changes saved successfully.",
      });

      setIsEditable(false);
    } catch (error) {
      console.error("Error updating binding details:", error);
    }
  };

  return (
    <div className="flex flex-col ml-5 w-[40%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow max-md:mt-5">
        <div className="relative flex flex-col pt-2.5 pr-3 pb-2.5 pl-3 w-full bg-sky-100 rounded-xl">
          <button
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 bg-red-100 py-1 px-3 rounded-full hover:bg-gray-3"
            onClick={onClose}
          >
            <strong class="text-xl align-center cursor-pointer alert-del">
              &times;
            </strong>
          </button>
          <div className="flex gap-3 justify-between items-start">
            <div className="flex justify-center items-center px-5 text-2xl font-bold leading-8 text-white whitespace-nowrap bg-violet-300 rounded-xl aspect-[1.03] h-[60px]">
              {binding.priorityNum}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center px-2.5 mt-3 border border-solid border-[color:var(--Blue-600,#1E88E5)] h-[155px] rounded-[100px] w-[155px]">
              <div className="flex overflow-hidden relative flex-col px-px w-full aspect-square">
                <div className="relative shrink-0 bg-blue-300 rounded-full h-full w-full" />
                <img
                  loading="lazy"
                  src={binding.idPhoto}
                  className="object-cover absolute inset-0 size-full border rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="self-center mt-3 text-xl font-bold text-center whitespace text-neutral-800">
              {`${binding.firstName} ${
                binding.middleName ? binding.middleName + " " : ""
              }${binding.lastName}`}
            </div>
            <div className="self-center mt-2.5 text-sm font-semibold text-center text-neutral-500">
              {binding.studentNum}
            </div>
            <div className="self-center mt-2.5 text-xl font-bold text-center text-neutral-800">
              {binding.programeCode}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 pt-6 pb-12 w-full text-sm font-medium leading-5 rounded border border-solid bg-neutral-50 border-[color:var(--Grey-200,#F5F5F5)]">
          <div className="text-neutral-800">Information</div>
          <div className="flex gap-2 justify-between mt-3 text-xs whitespace-nowrap text-neutral-500">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/40167252833974e55b8daf9e213a2150888a9426d85ae581283ba04d3df51681?"
              className="w-4 aspect-square"
            />
            <div className="grow">{binding.email}</div>
          </div>
          <div className="mt-7 text-neutral-800">Title</div>
          <div className="mt-3 text-base font-bold text-neutral-500">
            {binding.title}
          </div>
          <div className="mt-7 text-neutral-800">Status</div>
          <div className="flex flex-col gap-1 self-start px-1.5 py-px mt-2 text-xs tracking-wide leading-4 text-yellow-400 whitespace-nowrap rounded-xl">
          <select
            className="justify-center px-2 py-1 bg-yellow-50 rounded-[100px]"
            value={status}
            onChange={handleStatusChange}
          >
            {bindingStatuses.map((statusObj) => (
              <option key={statusObj.status} value={statusObj.status}>
                {statusObj.status}
              </option>
            ))}
          </select>
          </div>
          {/* Next Status Button */}
          <div className="flex justify-center text-center text-white mt-4">
            <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => handleProceedNextStatus(binding.status)}
              >
                Update to Next Status
            </button>
            {/* <div className="grow justify-center px-5 py-3 bg-sky-500 rounded">
              Complete Order
            </div>
            <div className="grow justify-center px-5 py-3 bg-sky-500 rounded">
              Complete Order
            </div> */}
          </div>
          {binding.status === "For Binding" && (
          <div className="flex flex-col mt-2 gap-2 px-4 pt-4 pb-4 w-full text-sm font-medium leading-5 rounded border border-solid bg-neutral-50 border-[color:var(--Grey-200,#F5F5F5)]">
            {/* Acknowledgement ID */}
            <div className="font-semibold text-neutral-500">
              Acknowledgement ID:{" "}
              {isEditable ? (
                <input
                  type="text"
                  name="ackID"
                  value={editableFields.ackID}
                  onChange={handleChangeID}
                  style={{ outline: "2px solid #6c757d" }}
                />
              ) : (
                editableFields.ackID || "N/A"
              )}
            </div>
            {/* Binding ID */}
            <div className="font-semibold text-neutral-500">
              Binding ID:{" "}
              {isEditable ? (
                <input
                  type="text"
                  name="bindID"
                  value={editableFields.bindID}
                  onChange={handleChangeID}
                  style={{ outline: "2px solid #6c757d" }}
                />
              ) : (
                editableFields.bindID || "N/A"
              )}
            </div>
            {/* OR ID */}
            <div className="font-semibold text-neutral-500">
              OR ID:{" "}
              {isEditable ? (
                <input
                  type="text"
                  name="orID"
                  value={editableFields.orID}
                  onChange={handleChangeID}
                  style={{ outline: "2px solid #6c757d" }}
                />
              ) : (
                editableFields.orID || "N/A"
              )}
            </div>
            {/* Update button */}
            {isEditable && (
              <button onClick={handleSaveIDChanges}>Save Changes</button>
            )}
            <button onClick={() => setIsEditable(true)}>Edit</button>
          </div>
        )}
          <div className="mt-2 font-semibold text-neutral-500">
            Appointment Date: {binding.apptDate || "N/A"}
            <br />
            Copies: {binding.copies || "N/A"}
            <br />
            Amount Due: {binding.amount || binding.copies*250 || "N/A"}
          </div>
          <div className="flex gap-0 justify-between mt-7 whitespace-nowrap text-neutral-800">
            <div className="grow">Attachment</div>
            {/* Drop down icon */}
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/36b256fbaad2472e7560c418a759003ae55ae5db0e7d2bc445618c056c108363?"
              className="my-auto w-4 aspect-square"
            />
          </div>
          <div className="flex gap-3 justify-between mt-3 text-xs leading-5 whitespace-nowrap">
            <Image
              loading="lazy"
              src={attachIcon}
              className="shrink-0 h-6 w-6 aspect-square"
              alt="File Attach Icon"
            />
            <a
              href={binding.docxFile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col flex-1"
            >
              <div className="text-neutral-800">DOCX Manuscipt</div>
              <div className="text-neutral-400">4/16/2021 07:47:03 </div>
            </a>
          </div>
          <div className="flex gap-3 justify-between mt-3 text-xs leading-5 whitespace-nowrap">
            <Image
              loading="lazy"
              src={attachIcon}
              className="shrink-0 h-6 w-6 aspect-square"
              alt="File Attach Icon"
            />
            <a
              href={binding.pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col flex-1"
            >
              <div className="text-neutral-800">PDF Manuscript</div>
              <div className="text-neutral-400">3/20/2021 12:47:03 </div>
            </a>
          </div>
          <div className="flex gap-3 justify-between mt-3 text-xs leading-5 whitespace-nowrap">
            <Image
              loading="lazy"
              src={attachIcon}
              className="shrink-0 h-6 w-6 aspect-square"
              alt="File Attach Icon"
            />
            <a
              href={binding.pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col flex-1"
            >
              <div className="text-neutral-800">JPEG/JPG 2by2 ID Photo</div>
              <div className="text-neutral-400">3/20/2021 12:47:03 </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
