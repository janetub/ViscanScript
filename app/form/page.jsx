/**
 * app/form/page.jsx
 * 
 * submission form
 */

"use client";

import CreateBindingModal from "@/components/BindingRequestForm";
import { UserAuth } from "@/context/AuthContext";
import LoginPage from "../../components/SignInForm";

export default function CreateBindingePage() {
  const { isLoggedIn, logOut } = UserAuth();

  if (!isLoggedIn) {
    return <LoginPage callingComponent="form" />;
  }

  const handleLogout = () => {
    logOut();
  };

  return(
    <div className="flex flex-col bg-white min-h-screen">
      <div className="justify-between items-between">
        <div className="gap-5 justify-center self-end">
          <div className="flex justify-end m-2">
            <button
              className="text-sm text-violet-800 font-medium hover:underline focus:outline-none"
              onClick={handleLogout}
            >
              Signout
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-600 bg-opacity-50 overflow-y-auto w-full flex justify-center items-start">
        <CreateBindingModal />
      </div>
    </div>
  );
}