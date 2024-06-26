/**
 * components/BindingRequestForm.jsx
 *
 * Binding Request Submission Form
 *
 * TODO: retain field inputs
 * TODO: successful/failed dialog
 */

import { createDocument } from "@/utils/getDocs";
import { finalizeUpload, startUpload } from "@/utils/storageService";
import { generateUniqueId } from "@/utils/transactionIdTracker";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { deleteDocument } from "@/utils/firestoreService";
import { assignPriorityNum } from "@/utils/priorityNum";
import "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { fetchLatestOperationDates } from "@/api/operationDate";

const initialFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  studentNumPart1: "",
  studentNumPart2: "",
  studentNumPart3: "",
  email: "",
  programCode: "",
  title: "",
  copies: 1,
  pdfFile: null,
  docxFile: null,
  idPhoto: null,
  apptDate: "",
};

const programList = [
  { title: "Bachelor of Science in Agriculture", code: "BSA" },
  { title: "Bachelor of Science in Development Communication", code: "BSDC" },
  { title: "Bachelor of Science in Food Technology", code: "BSFT" },
  { title: "Bachelor of Arts in English Language Studies", code: "AB English" },
  { title: "Bachelor of Arts in Philosophy", code: "AB Philosophy" },
  { title: "Bachelor of Science in Applied Physics", code: "BSAP" },
  { title: "Bachelor of Science in Biology", code: "BSB" },
  { title: "Bachelor of Science in Biotechnology", code: "BSBT" },
  { title: "Bachelor of Science in Chemistry", code: "BSC" },
  { title: "Bachelor of Science in Marine Biology", code: "BSMarineBio" },
  { title: "Bachelor of Science in Mathematics", code: "BSM" },
  { title: "Bachelor of Science in Statistics", code: "BSStat" },
  { title: "Bachelor of Culture and Arts Education", code: "BCaEd" },
  { title: "Bachelor of Early Childhood Education", code: "BECEd" },
  { title: "Bachelor of Elementary Education", code: "BEEd" },
  { title: "Bachelor of Physical Education", code: "BPEd" },
  { title: "Bachelor of Secondary Education", code: "BSEd" },
  {
    title: "Bachelor of Science in Agricultural and Biosystems Engineering",
    code: "BSABE",
  },
  { title: "Bachelor of Science in Civil Engineering", code: "BSCE" },
  { title: "Bachelor of Science in Computer Science", code: "BSCS" },
  { title: "Bachelor of Science in Geodetic Engineering", code: "BSGE" },
  { title: "Bachelor of Science in Mechanical Engineering", code: "BSME" },
  { title: "Bachelor of Science in Meteorology", code: "BSMet" },
  { title: "Bachelor of Science in Environmental Science", code: "BSES" },
  { title: "Bachelor of Science in Forestry", code: "BSF" },
  { title: "Bachelor of Science in Agribusiness", code: "BSAB" },
  { title: "Bachelor of Science in Economics", code: "BSE" },
  { title: "Bachelor of Science in Hospitality Management", code: "BSHM" },
  { title: "Bachelor of Science in Tourism Management", code: "BSTM" },
  { title: "Bachelor of Science in Nursing", code: "BSN" },
  { title: "Doctor of Veterinary Medicine", code: "DVM" },
];

export default function BindingRequestForm({
  isOpen,
  onClose = null,
  refetch = null,
  email = "",
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [operatingDays, setOperatingDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dates = await fetchLatestOperationDates();
      if (dates) {
        setOperatingDays(dates);
      }
    };
    fetchData();
  }, []);

  const isDayDisabled = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const todayString = format(new Date(), "yyyy-MM-dd");

    // console.log({ operatingDays, dateString, todayString });
    return (
      operatingDays.includes(dateString) && dateString >= todayString
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // sanitization
    let sanitizedData = { ...formData };
    for (let field in sanitizedData) {
      if (typeof sanitizedData[field] === "string") {
        sanitizedData[field] = sanitizedData[field].trim(); // Remove leading/trailing white spaces
        sanitizedData[field] = sanitizedData[field].replace(/<[^>]*>/g, ""); // Remove any HTML tags
      }
    }

    // display names for dialogs
    const fieldDisplayNames = {
      firstName: "First Name",
      middleName: "Middle Name",
      lastName: "Last Name",
      studentNumPart1: "Student Number",
      studentNumPart2: "Student Number",
      studentNumPart3: "Student Number",
      email: "Email Address",
      programCode: "Program Code",
      title: "Thesis Title",
      copies: "Number of Copies",
      pdfFile: "PDF File",
      docxFile: "Word File",
      idPhoto: "ID Photo",
      apptDate: "Appointment Date",
    };
    // check if inputs are valid
    const requiredFields = Array.from(
      document.querySelectorAll(
        "input:required, select:required, textarea:required",
      ),
    ).map((input) => input.name);
    for (let field of requiredFields) {
      if (sanitizedData[field] == "" || sanitizedData[field] == null) {
        alert(
          `Please fill out the ${fieldDisplayNames[field] || field} field.`,
        );
        return;
      }
    }
    if (!programList.find((program) => program.code === formData.programCode)) {
      alert("Invalid program code.");
      return;
    }

    if (!operatingDays.includes(formData.apptDate)) {
      alert("Invalid appointment date.");
      console.log(operatingDays);
      console.log(formData.apptDate);
      return;
    }
    // show review popup
    const shouldSubmit = window.confirm(`Please review your information:
      First Name: ${formData.firstName}
      Middle Name: ${formData.middleName}
      Last Name: ${formData.lastName}
      Student Number: ${formData.studentNumPart1}-${formData.studentNumPart2}-${formData.studentNumPart3}
      Email Address: ${formData.email}
      Program Code: ${formData.programCode}
      Thesis Title: ${formData.title}
      Number of Copies: ${formData.copies}
      PDF Filename: ${formData.pdfFile},
      Docx Filename: ${formData.docxFile},
      ID Photo Filename: ${formData.idPhoto},
      Appointment Date: ${formData.apptDate}
    `);
    if (!shouldSubmit) {
      return;
    }

    // creating binding order request
    const transactionId = generateUniqueId(formData.email.split("@")[0]);
    const pdfUploadTask = startUpload(
      formData.pdfFile,
      `BindingOrders/${transactionId}/pdfFile`,
    );
    const docxUploadTask = startUpload(
      formData.docxFile,
      `BindingOrders/${transactionId}/docxFile`,
    );
    const idPhotoUploadTask = startUpload(
      formData.idPhoto,
      `BindingOrders/${transactionId}/idPhoto`,
    );
    const requestDate = format(new Date(), "yyyy-MM-dd");
    const studentNum = `${formData.studentNumPart1}-${formData.studentNumPart2}-${formData.studentNumPart3}`;
    const {
      studentNumPart1,
      studentNumPart2,
      studentNumPart3,
      ...restOfFormData
    } = formData; // destructuring

    try {
      const [pdfUploadSnapshot, docxUploadSnapshot, idPhotoUploadSnapshot] =
        await Promise.all([pdfUploadTask, docxUploadTask, idPhotoUploadTask]);

      const pdfFileURL = await getDownloadURL(pdfUploadSnapshot);
      const docxFileURL = await getDownloadURL(docxUploadSnapshot);
      const idPhotoURL = await getDownloadURL(idPhotoUploadSnapshot);

      const transactionData = {
        ...restOfFormData,
        studentNum,
        requestDate,
        status: "Pending",
        pdfFile: pdfFileURL,
        docxFile: docxFileURL,
        idPhoto: idPhotoURL,
        ackID: "",
        amount: "",
        bindID: "",
        orID: "",
        remarks: "",
        isClaimed: false,
        isPaid: false,
      };
      try {
        const docRef = doc(db, "bindings", transactionId);
        console.log("Bindings Reference", docRef);
        await setDoc(docRef, transactionData);
        console.log("Document successfully written!");
  
        const priorityNum = await assignPriorityNum(db, formData.apptDate);
        await updateDoc(docRef, { priorityNum });
        console.log("Priority added!");
  
        window.confirm(
          `Congratulations! Your Binding Order Request has been successfully submitted. We've sent you an email at ${restOfFormData.email} with your priority number and further instructions. Please check your inbox.`,
        );
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error writing document or adding priority: ", error);
        window.confirm(
          "An error occurred during request submission. Please try again.",
        );
      }
    } catch (error) {
      await deleteDocument("BindingOrders", transactionId);

      console.error("Error creating transaction: ", error);
      window.confirm(
        "An error occured during request submission. Please try again.",
      );
    } finally {
      // if (pdfUploadTask) {
      //   pdfUploadTask.cancel();
      // }
      // if (docxUploadTask) {
      //   docxUploadTask.cancel();
      // }
      // if (idPhotoUploadTask) {
      //   idPhotoUploadTask.cancel();
      // }
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setFormData(initialFormData);
    }
  };

  useEffect(() => {
    if (email) {
      const studentNum = email.split("@")[0];
      setFormData({ ...formData, studentNum });
      const studentNumParts = email.split("@")[0].split("-");
      if (studentNumParts.length === 3) {
        setFormData({
          ...formData,
          studentNumPart1: studentNumParts[0],
          studentNumPart2: studentNumParts[1],
          studentNumPart3: studentNumParts[2],
          email: email,
        });
      }
    }
  }, [email]);

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg w-full m-2 lg:p-6 lg:w-1/2 lg:my-8 md:h-auto">
      <form onSubmit={handleSubmit}>
        {/* Author name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstName}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="middleName"
          >
            Middle Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="middleName"
            name="middleName"
            type="text"
            placeholder="Middle Name"
            onChange={handleChange}
            value={formData.middleName}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastName}
            required
          />
        </div>
        {/* Student number field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="studentNum"
          >
            Student Number <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center md:max-w-md lg:max-w-lg">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="studentNumPart1"
              name="studentNumPart1"
              type="text"
              placeholder="00"
              pattern="^\d{2}$"
              onChange={handleChange}
              value={formData.studentNumPart1}
              maxLength="2"
              required
            />
            <span className="mx-2">-</span>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="studentNumPart2"
              name="studentNumPart2"
              type="text"
              placeholder="0"
              pattern="^\d$"
              onChange={handleChange}
              value={formData.studentNumPart2}
              maxLength="1"
              required
            />
            <span className="mx-2">-</span>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="studentNumPart3"
              name="studentNumPart3"
              type="text"
              placeholder="00000"
              pattern="^\d{5}$"
              onChange={handleChange}
              value={formData.studentNumPart3}
              maxLength="5"
              required
            />
          </div>
        </div>
        {/* VSU Email address */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address <span className="text-red-600">*</span>
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
        {/* Program list and their corresponding codes */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="programCode"
          >
            Program Code <span className="text-red-600">*</span>
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="programCode"
            name="programCode"
            onChange={handleChange}
            value={formData.programCode}
            required
          >
            <option value="">Select a program</option>
            {programList.map((program, index) => (
              <option key={index} value={program.code}>
                {program.title}
              </option>
            ))}
            required
          </select>
        </div>
        {/* Thesis title */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Thesis Title <span className="text-red-600">*</span>
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
        {/* Number of Copies */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="copies"
          >
            Number of Copies <span className="text-red-600">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="copies"
            name="copies"
            type="number"
            placeholder="Number of Copies"
            onChange={handleChange}
            value={formData.copies || 1}
            min="1"
            step="1"
            required
          />
        </div>
        {/* PDF File Upload field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pdfFile"
          >
            Upload manuscript in PDF format (.pdf){" "}
            <span className="text-red-600">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pdfFile"
            name="pdfFile"
            type="file"
            accept=".pdf"
            onChange={handleChange}
            required
          />
        </div>
        {/* DOCX File Upload field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="docxFile"
          >
            Upload manuscript in Word format (.docx){" "}
            <span className="text-red-600">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="docxFile"
            name="docxFile"
            type="file"
            accept=".docx"
            onChange={handleChange}
            required
          />
        </div>
        {/* ID Photo Upload field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="idPhoto"
          >
            Upload 2x2 ID photo (.jpg/.jpeg){" "}
            <span className="text-red-600">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="idPhoto"
            name="idPhoto"
            type="file"
            accept=".jpg, .jpeg"
            onChange={handleChange}
            required
          />
        </div>
        {/* Appointment Date field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="apptDate"
          >
            Appointment Date <span className="text-red-600">*</span>
          </label>
          <ReactDatePicker
            id="apptDate"
            name="apptDate"
            type="date"
            selected={formData.apptDate}
            onChange={(date) => {
              const formattedDate = format(date, "yyyy-MM-dd");
              setFormData({ ...formData, apptDate: formattedDate });
            }}
            filterDate={isDayDisabled}
            placeholderText="Select an appointment date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Form actions */}
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
