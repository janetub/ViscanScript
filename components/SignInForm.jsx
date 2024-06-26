/**
 * app/dashboard/login/page.jsx
 * 
 */

import { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import Image from "next/image";
import vsuScript from "@/public/images/vsuscript/vsuscript-logo-black.png";
import VSULogo from "@/public/images/vsu-logo-2.png";
import googleLogo from "@/public/images/google.svg"
import Preloader from "./Preloader";

export default function LoginPage({ callingComponent }) {
  const { currentUser, isFailedAttempt, handleRedirectResult, checkAuthorization, redirect, isAuthChecking, isLogged } = UserAuth();
  
  useEffect(() => {
    try {
      if(currentUser) {
        checkAuthorization(currentUser, callingComponent);
      } else {
        handleRedirectResult(callingComponent);
      }
    } catch (error) {
      console.error("Error in useEffect: ", error);
    }
  }, [redirect, currentUser, callingComponent, handleRedirectResult, checkAuthorization]);
  

  const handleSignIn = async () => {
    try {
      await redirect();
    } catch (error) {
      console.error("Error occurred during sign-in: ", error);
    }
  };

  if (isAuthChecking || (!isLogged && !isAuthChecking && currentUser)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Preloader />
      </div>
    );
  } 

  return (
  <div className="flex flex-col md:flex-row h-screen overflow-auto">
    <div className="flex flex-col max-md:w-full max-md:ml-0 w-2/5 bg-sky-100 px-5 items-center">
      <div className="my-auto pb-10">
        {/* VSU Script Logo */}
        <Image
          src={vsuScript}
          className="self-center"
          alt="VSU Script Logo"
        />
        {/* Sign Up card */}
        <div className= "p-8 bg-white rounded-xl flex flex-col items-start">
          <div className="text-2xl font-bold leading-8 text-violet-900">
            Hi, Welcome back!
          </div>
          <div className="mt-4 text-neutral-400">
            Please use the university-provided email.
          </div>
          {isFailedAttempt && (
            <div className="mt-2 text-red-500">Invalid email.</div>
          )}
          <button
            className="flex justify-center items-center self-stretch py-2 mt-8 font-medium rounded-xl border border-solid bg-neutral-100 border-[color:var(--Grey-200,#F1F1F1)] text-neutral-500 max-md:px-5 max-md:max-w-full hover:bg-gray-200 focus:bg-gray-200 transition duration-300 ease-in-out"
            onClick={handleSignIn}
          >
            <div className="flex items-center gap-3">
              <Image
                loading="lazy"
                src={googleLogo}
                className="w-8 aspect-square"
                alt="Google Logo"
              />
              <span className="hidden sm:inline">Sign in with Google</span>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div className="w-full md:w-3/5 bg-white px-5 items-center my-auto py-14">
        {/* banner */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-[315px] h-[315px]">
            <Image
                loading="lazy"
                src={VSULogo}
                className="mb-4 self-center"
                alt="VSU Logo"
            />
          </div>
          {/* other banner texts */}
          <div className="text-4xl font-bold leading-10 text-center text-neutral-800 max-md:mt-10">
            Viscan Script
          </div>
          <div className=" mt-4 text-base font-medium leading-6 text-center text-neutral-500">
            Thesis Binding Order Request and Management Made Easy
          </div>
          <div className="mt-4 w-28 h-1.5 bg-violet-400 rounded-xl">
          </div>
        </div>
    </div>
  </div>
  );
}