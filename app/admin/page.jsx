/**
 * app/admin/page.jsx
 * 
 * admin page
 */

'use client';

import LoginPage from "@/components/SignInForm";
import { UserAuth } from "@/context/AuthContext";


export default function AdminPage() {
  const { isLoggedIn, logOut } = UserAuth();

  if (!isLoggedIn) {
    return <LoginPage callingComponent="admin"/>;
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
      <div className="bg-opacity-50 overflow-y-auto w-full flex h-screen">
            <p className="text-xl text-gray-700 m-auto">Admin page is coming soon...</p>
      </div>
    </div>
  );
}