import React, { useState } from "react";
import logo from "../assets/logo.png"; //

const UserInfoCard = ({ userInfo, onClose }) => {
  const {
    id,
    name,
    studentNumber,
    email,
    courseCode,
    appointmentDate,
    title,
    copies,
    remarks,
    amount,
    status,
  } = userInfo;

  const [currentStatus, setCurrentStatus] = useState(status);

  const onStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
  };

  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
      <button
        className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 bg-red-100 py-2 px-3 rounded-full hover:bg-gray-3"
        onClick={onClose}
      >
        <strong class="text-xl align-center cursor-pointer alert-del">
          &times;
        </strong>
      </button>
      <div className="flex flex-col items-center bg-white p-6 shadow rounded-lg">
        <div className="flex justify-center items-center mb-4">
          <div className="rounded-full bg-gray-200 p-4 text-3xl font-semibold">
            {id}
          </div>
        </div>
        <div className="flex flex-col items-center mb-4">
          <img
            src={logo}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2"
          />
          <div className="font-bold text-xl text-center">{name}</div>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center text-gray-700 text-base mb-2">
            <p>Student Number</p>
            <p>{studentNumber}</p>
          </div>
          <div className="flex justify-between items-center text-gray-700 text-base mb-2">
            <p>Email</p>
            <p>{email}</p>
          </div>
          <div className="flex justify-between items-center text-gray-700 text-base mb-2">
            <p>Course Code</p>
            <p>{courseCode}</p>
          </div>
          <div className="flex justify-between items-center text-gray-700 text-base mb-2">
            <p>Appointment Date</p>
            <p>{appointmentDate}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-900 font-bold">Title</p>
        <p className="text-gray-700 text-base">{title}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-900 font-bold">Copies</p>
          <p className="text-gray-700 text-base">{copies}</p>
        </div>
        <div>
          <p className="text-gray-900 font-bold">Remarks</p>
          <p className="text-gray-700 text-base">{remarks}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-900 font-bold">Amount</p>
        <p className="text-gray-700 text-base">{amount}</p>
      </div>
      <div className="flex flex-row mt-4 mb-4">
        <div className="flex flex-col w-3/5">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Paid</span>
          </label>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Claimed</span>
          </label>
        </div>
        <div className="text-sm text-gray-700">
          <p>Ack. ID ---</p>
          <p>Order ID ---</p>
          <p>OR ID ---</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 space-x-2">
        <button
          className={`rounded-full px-4 py-1 text-sm font-semibold shadow-sm ${
            currentStatus === "Pending"
              ? "bg-green-500 text-white"
              : "bg-white text-gray-500"
          } border border-green-500`}
          onClick={() => onStatusChange("Pending")}
        >
          {currentStatus === "Pending" ? "✓" : ""} Pending
        </button>
        <button
          className={`rounded-full px-4 py-1 text-sm font-semibold shadow-sm ${
            currentStatus === "Submitted"
              ? "bg-green-500 text-white"
              : "bg-white text-gray-500"
          } border border-green-500`}
          onClick={() => onStatusChange("Submitted")}
        >
          {currentStatus === "Submitted" ? "✓" : ""} Submitted
        </button>
        <button
          className={`rounded-full px-4 py-1 text-sm font-semibold shadow-sm ${
            currentStatus === "Checked"
              ? "bg-green-500 text-white"
              : "bg-white text-gray-500"
          } border border-gray-300`}
          onClick={() => onStatusChange("Checked")}
        >
          {currentStatus === "Checked" ? "✓" : ""} Checked
        </button>
        {/* Add more status buttons as needed */}
      </div>
      <div className="flex flex-wrap items-center justify-center mt-4">
        <button className="bg-gray-500 hover:bg-gray-700 text-white rounded-full px-3 py-2 m-1">
          Generate Binding Order
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white rounded-full px-3 py-2 m-1">
          Generate Acknowledgement Receipt
        </button>
      </div>
      <div className="flex flex-row align-center mt-4">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center m-2">
          PDF
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center m-2">
          DOCX
        </button>
      </div>
    </div>
  );
};

export default UserInfoCard;
