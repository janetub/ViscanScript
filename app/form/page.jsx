/**
 * app/form/page.jsx
 * 
 * submission form
 */

"use client";

import CreateBindingModal from "@/components/BindingRequestForm";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import LoginPage from "../login/page";
import Preloader from "@/components/Preloader";

const CreateBindingePage = () => {
  const { user, setUser, logOut, authChecking } = UserAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [setUser]);

  if (!user && !loading) {
    return <LoginPage callingComponent="CreateBindingePage" />;
  }

  const handleLogout = () => {
    setLoading(true);
    logOut();
    localStorage.removeItem('user'); 
    setUser(null);
    setLoading(false);
  };

  if (loading || authChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Preloader />
      </div>
    )
  }

  return(
    <div className="flex flex-col bg-white min-h-scree">
      <div className="justify-between items-between">
        <div className="gap-5 justify-center self-end">
          <div className="flex justify-end mt-4">
            <button
              className="text-sm text-violet-800 font-medium hover:underline focus:outline-none"
              onClick={handleLogout}
            >
              Signout {user.displayName || user.email}
            </button>
          </div>
        </div>
      </div>
      <CreateBindingModal />
    </div>
  );
};

export default CreateBindingePage;