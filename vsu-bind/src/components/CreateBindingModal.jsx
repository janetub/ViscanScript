import React, { useState } from "react";
import { createTransaction, fetchTransactions } from "../api/transactions";

const s = {
  id: 18,
  title: "AGRONOMIC RESPONSE AND POTASSIUM UPTAKE OF DIFFERENT POT...",
  status: "Binding",
  name: "Judy Lee Baguinang",
  studentNumber: "21-1-00300",
  email: "21-1-00300@vsu.edu.ph",
  courseCode: "BSCS",
  appointmentDate: "January 13, 2023",
  copies: 4,
  remarks: "Awaiting review",
  amount: 600,
};

const CreateBindingModal = ({ isOpen, onClose, refetch }) => {
  const [formData, setFormData] = useState({
    name: "",
    studentNumber: "",
    email: "",
    courseCode: "",
    title: "",
    copies: 1,
    pdfFile: null,
    docxFile: null,
    idPhoto: null,
    appointmentDate: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0].name });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data", formData);

    try {
      const transaction = await createTransaction({
        ...formData,
        status: "Pending",
      });

      refetch();
      console.log("Created Transactio", transaction);
    } catch (error) {
      console.error("Error creating transaction", error);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto w-full flex justify-center items-start">
      <div className="bg-white p-5 rounded shadow-lg w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="studentNumber"
            >
              Student Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="studentNumber"
              name="studentNumber"
              type="text"
              placeholder="Student Number"
              onChange={handleChange}
              value={formData.studentNumber}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="text"
              placeholder="Email Address"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="courseCode"
            >
              Course Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="courseCode"
              name="courseCode"
              type="text"
              placeholder="Course Code"
              onChange={handleChange}
              value={formData.courseCode}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Thesis Title
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              placeholder="Thesis Title"
              onChange={handleChange}
              value={formData.title}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="copies"
            >
              Number of Copies
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="copies"
              name="copies"
              type="number"
              placeholder="Number of Copies"
              onChange={handleChange}
              value={formData.copies}
              required
            />
          </div>
          {/* PDF File Upload field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pdfFile"
            >
              Upload manuscript in PDF format (.pdf)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pdfFile"
              name="pdfFile"
              type="file"
              accept=".pdf"
              onChange={handleChange}
            />
          </div>

          {/* DOCX File Upload field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="docxFile"
            >
              Upload manuscript in Word format (.docx)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="docxFile"
              name="docxFile"
              type="file"
              accept=".docx"
              onChange={handleChange}
            />
          </div>

          {/* ID Photo Upload field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="idPhoto"
            >
              Upload 2x2 ID photo (.jpg/.jpeg)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="idPhoto"
              name="idPhoto"
              type="file"
              accept=".jpg, .jpeg"
              onChange={handleChange}
            />
          </div>

          {/* Appointment Date field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="appointmentDate"
            >
              Appointment Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="appointmentDate"
              name="appointmentDate"
              type="date"
              onChange={handleChange}
              value={formData.appointmentDate}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Reset
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBindingModal;
