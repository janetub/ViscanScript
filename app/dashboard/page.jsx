/**
 * app/dashboard/page.jsx
 *
 * This file defines the DashboardPage component, which represents the staffs' dashboard page for the admin section of the application.
 * It includes functionality for displaying binding requests and managing user interactions.
 */

"use client";

import { useState, useEffect } from "react";
import { UserAuth } from "@/context/AuthContext";
import BindingDetails from "@/components/BindingDetails";
import BindingTable from "@/components/BindingTable";
import Tabs from "@/components/BindingOrderTabs";
import Preloader from "@/components/Preloader";
import Image from "next/image";
import LoginPage from "@/components/SignInForm";
import { addBindingsToFirestore } from "@/utils/addBindings";
import vsuScript from "@/public/images/vsuscript/vsuscript-logo-black.png";
import UserInfoCard from "@/components/UserInfoCard";
import BindingManagement from "@/components/BindingManagement";
import { MainNav } from "@/contants/mainNav";
import DateManagement from "@/components/DateManagement";
/**
 * DashboardPage component represents the admin dashboard page.
 * It displays binding requests and provides functionality for managing user interactions.
 */
export default function DashboardPage() {
  const { userProfilePhoto, isLoggedIn, logOut } = UserAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBinding, setSelectedBinding] = useState({});
  const [bindings, setBindings] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedMainNav, setSelectedMainNav] = useState(
    MainNav.BINDING_MANAGEMENT,
  );


  if (!isLoggedIn) {
    return <LoginPage callingComponent="dashboard" />;
  }

  const handleLogout = () => {
    try {
      logOut();
    } catch (error) {
      console.error("Error loggging out: ", error);
    }
  };

  // Open binding details modal
  const handleOpen = (binding) => {
    try {
      setShowDetails(true);
      setSelectedBinding(binding);
    } catch (error) {
      console.error("Error opening binding details: ", error);
    }
  };

  // Close binding details modal
  const handleClose = () => {
    try {
      setShowDetails(false);
    } catch (error) {
      console.error("Error closing details: ", error);
    }
  };

  const handleTabSelect = (tab) => {
    try {
      setSelectedTab(tab);
    } catch (error) {
      console.error("Error handling tab selection: ", error);
    }
  };

  const handleSelectMainNav = (mainNav) => {
    console.log("Selected Main Nav: ", mainNav);
    setSelectedMainNav(mainNav);
  };

  const handleSelectDashboard = () => {
    //
  };

  return (
    <div className="flex flex-col px-6 py-5 bg-white min-h-screen">
      <div className="flex gap-5 justify-between items-between">
        <div className="flex">
          <Image
            loading="lazy"
            src={vsuScript}
            className="w-20 self-center"
            alt="VSU Script Logo"
          />
        </div>
        <div className="flex gap-5 justify-center">
          <div className="flex justify-end self-start mt-4">
            <button
              className="text-sm text-violet-800 font-medium self-start hover:underline focus:outline-none"
              onClick={handleLogout}
            >
              Signout
            </button>
          </div>
          {/* Notification bell */}
          <div className="flex flex-col justify-center items-center w-9 h-9rounded-lg px-full py-full">
            <div className="flex justify-center items-center px-2 w-9 h-9 rounded-lg bg-violet-100">
              <div className="flex overflow-hidden relative flex-col justify-center items-center w-5 aspect-square">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3ad38adf33bf466063e09e5a4b565f38c8d4cf76717134f5fee17c397b99a16?apiKey=e4fb5c3f22154b41a48f253e88461b6a&"
                  className="object-cover absolute inset-0 size-full"
                />
              </div>
            </div>
          </div>
          {/* profile card */}
          <div className="rounded-3xl border border-sky-100 border-solid max-w-[100px] min-h-[48px] flex items-center justify-center p-2">
            {/* Profile photo background circle */}
            <div className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center">
              {/* Profile photo person */}
             <img
                loading="lazy"
                src={userProfilePhoto}
                className="rounded-full object-cover"
                style={{ width: "32px", height: "32px" }}
                alt="Profile"
              />
            </div>
            {/* Profile settings */}
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets%2Fe4fb5c3f22154b41a48f253e88461b6a%2Ff6d0d48516144df3ab38d682f6f5936c"
              className="rounded-full max-w-[20px] stroke-[1.5px] stroke-sky-500 ml-2"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-end mt-5 text-sm leading-5 text-neutral-500 max-md:mt-10">
              <div className="flex flex-col self-stretch w-full bg-white">
                <div className="flex gap-3 p-3 whitespace-nowrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets%2Fe4fb5c3f22154b41a48f253e88461b6a%2F842ec6b089b444098ed6040e03759ab3"
                    className="shrink-0 w-6 aspect-square"
                  />
                  <div className="grow" onClick={handleSelectDashboard}>Dashboard</div>
                </div>
                <div className="shrink-0 mt-4 h-px bg-sky-100 border border-sky-100 border-solid" />
                <div
                  className={`mt-8 font-medium leading-[143%] text-neutral-800 ${
                    selectedMainNav === MainNav.OPERATION_DATE &&
                    "bg-sky-100 rounded-xl rounded-xl p-2"
                  }`}
                  onClick={() => handleSelectMainNav(MainNav.OPERATION_DATE)}
                >
                  Manage Operation Date
                </div>
                <div
                  className={`mt-8 font-medium leading-[143%] text-neutral-800 ${
                    selectedMainNav === MainNav.BINDING_MANAGEMENT &&
                    "bg-sky-100 rounded-xl rounded-xl p-2"
                  }`}
                  onClick={() =>
                    handleSelectMainNav(MainNav.BINDING_MANAGEMENT)
                  }
                >
                  Bindings Management
                </div>
                <div className="flex gap-3 justify-between p-3 mt-1.5 text-violet-800 whitespace-nowrap leading-[143%]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets%2Fe4fb5c3f22154b41a48f253e88461b6a%2Fcd5a20cfda614c83955525f00eb508ab"
                    className="w-6 aspect-square"
                  />
                  <div className="flex-auto my-auto">User</div>
                </div>
                <Tabs selectedTab={selectedTab} onSelect={handleTabSelect} />
              </div>
            </div>
          </div>
          {/* Table */}
          {selectedMainNav === MainNav.BINDING_MANAGEMENT && (
            <BindingManagement
              handleOpen={handleOpen}
              selectedTab={selectedTab}
              selectedBinding={selectedBinding}
              setSelectedTab={setSelectedTab}
              handleClose={handleClose}
              showDetails={showDetails}
            />
          )}
          {selectedMainNav === MainNav.OPERATION_DATE && <DateManagement />}
        </div>
      </div>
    </div>
  );
}
