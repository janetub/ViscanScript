/**
 * app/form/login/page.jsx
 *
 * Login is separated as its page layout might get distinct from ther login pages over time.
 */

"use client";
import { useEffect } from "react";
import { UserAuth } from "@/context/AuthContext";
import * as React from "react";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo-ver2.png";
import vsu_logo from "@/assets/vsu-logo.png";
import Spinner from "@/components/Spinner";

function LoginPage(props) {
  const { formSignIn, isLoading, user } = UserAuth();
  const router = useRouter();
  const [userExists, setUserExists] = React.useState(true);
  const isSignedIn = user !== null;

  const handleSignIn = async () => {
    try {
      // Sign in with Google
      const { exist } = await formSignIn();

      // If user exists, redirect to admin page
      if (exist) {
        router.push("/binding");
      } else {
        // User does not exist, store this information in local storage
        setUserExists(false);
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
    }
  };

  return (
    <div className="pl-20 bg-sky-100 max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto text-base leading-6 max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              src={logo.src}
              className="self-center max-w-full aspect-[2.22] w-[434px]"
            />
            <div className="flex flex-col items-start px-10 py-11 mt-10 bg-white rounded-xl shadow-sm max-md:px-5 max-md:max-w-full">
              <div className="text-2xl font-bold leading-8 text-violet-900">
                Hi, Welcome back!
              </div>
              <div className="mt-4 text-neutral-400">
                Enter your credentials to continue.
              </div>
              {!userExists && !isSignedIn && (
                <div className="mt-2 text-red-500">
                  Invalid email. Please try again
                </div>
              )}
              <button
                className="flex justify-center items-center self-stretch px-16 py-2 mt-8 font-medium whitespace-nowrap rounded-xl border border-solid bg-neutral-50 border-[color:var(--Grey-200,#F5F5F5)] text-neutral-500 max-md:px-5 max-md:max-w-full hover:bg-gray-200 focus:bg-gray-200 transition duration-300 ease-in-out"
                onClick={handleSignIn}
              >
                <div className="flex items-center gap-3">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc46bf46b46bd2574f8bfe907942abe3811ef34f55f793132597751423ae3b13?"
                    className="w-8 aspect-square"
                  />
                  <span>Sign in with Google</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-3/5 max-md:ml-0 max-md:w-full">
          <div className="flex overflow-hidden relative flex-col grow items-center px-20 py-12 h-screen max-md:px-5 max-md:mt-10 max-md:max-w-full bg-white">
            <img loading="lazy" src={vsu_logo.src} className="h-50 w-50" />
            <div className="relative text-4xl font-bold leading-10 text-center whitespace-nowrap text-neutral-800 mt-10">
              VSU Script
            </div>
            <div className="relative mt-4 text-base font-medium leading-6 text-center whitespace-nowrap text-neutral-500">
              Make Binding Your Thesis Easier
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
