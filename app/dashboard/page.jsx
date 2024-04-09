/**
 * app/admin/page.jsx
 * 
 * This file defines the DashboardPage component, which represents the staffs' dashboard page for the admin section of the application.
 * It includes functionality for displaying binding requests and managing user interactions.
 */

"use client";

import { useState, useEffect } from "react";  
import { UserAuth } from "@/context/AuthContext";
import BindingDetails from "@/components/BindingDetails";
import BindingTable from "@/components/BindingTable";
import { addBindingsToFirestore } from '../../utils/addBindings'; // for testing
import Tabs from '@/components/BindingOrderTabs';
import Preloader from "@/components/Preloader";
import Image from "next/image";
import LoginPage from "../login/page";


/**
 * DashboardPage component represents the admin dashboard page.
 * It displays binding requests and provides functionality for managing user interactions.
 */
function DashboardPage(props) {
  const { user, setUser, logOut, authChecking, isLoggedIn } = UserAuth(); // Get authentication state from context
  const [showDetails, setShowDetails] = useState(false); // State for showing binding details modal
  const [selectedBinding, setSelectedBinding] = useState({}); // State for selected binding details
  const [ bindings, setBindings ] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');

  // Open binding details modal
  const handleOpen = (binding) => {
    setShowDetails(true);
    setSelectedBinding(binding);
  };

  // Close binding details modal
  const handleClose = () => {
    setShowDetails(false);
  };

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  const addBindings = async () => {
    await addBindingsToFirestore(bindings);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  if (!isLoggedIn) {
    return <LoginPage callingComponent="DashboardPage" />;
  }

  const handleLogout = () => {
    logOut();
    localStorage.removeItem('user'); 
    window.location.reload();  
  };

  if (authChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Preloader />
      </div>
    )
  }

  return(
    <div className="flex flex-col px-6 py-5 bg-white min-h-scree">
      <div className="flex gap-5 justify-between items-between">
        <div className="flex">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets%2Fe4fb5c3f22154b41a48f253e88461b6a%2Fd2a1dd3df5d142afa65ab6c39126eb13"
            style={{ width: '100px', height: 'auto' }}
          />
        </div>
        <div className="flex gap-5 justify-center self-end">
          <div className="flex justify-end mt-4">
            <button
              className="text-sm text-violet-800 font-medium hover:underline focus:outline-none"
              onClick={handleLogout}
            >
              Signout 
            </button>
          </div>
          {/* Notification bell */}
          <div className="flex flex-col justify-center items-center self-start w-9 h-9rounded-lg px-full py-full">
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
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/909b5b372470788d838099a166f91359a700a636c364e24d02dcea30c8ba037f?apiKey=e4fb5c3f22154b41a48f253e88461b6a&width=100"
                className="rounded-full object-cover"
                style={{ width: '32px', height: '32px' }}
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
                  <div className="grow">Dashboard</div>
                </div>
                <div className="shrink-0 mt-4 h-px bg-sky-100 border border-sky-100 border-solid" />
                <div className="mt-8 font-medium leading-[143%] text-neutral-800">
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
          <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-4 py-5 w-full bg-sky-100 rounded-xl max-md:mt-5 max-md:max-w-full">
              <div className="justify-center items-start py-2 pl-4 text-base font-medium bg-white rounded-xl text-neutral-800 max-md:pr-5 max-md:max-w-full">
                <button>Binding Requests</button> {/* onClick={addBindings} For testing */}
              </div>
              <div className="flex flex-col px-5 pt-5 mt-4 bg-white rounded-xl max-md:max-w-full">
                <div className="pb-2.5 mb-4 max-md:max-w-full">
                  <div className="flex gap-0  max-md:flex-col max-md:gap-0 max-md: ">
                    <BindingTable
                      toggleShowDetails={handleOpen}
                      collectionName="bindings"
                      bindingOrderStatus={selectedTab !== 'all' ? selectedTab : null}
                    />
                    {showDetails && (
                      <BindingDetails
                        binding={selectedBinding}
                        onClose={handleClose}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default DashboardPage;
