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

function LoginPage(props) {
  const { formSignIn } = UserAuth();
  const router = useRouter();
  const [userExists, setUserExists] = React.useState(true);


  const handleSignIn = async () => {
    try {
      setUserExists(true); // Reset userExists state to true before attempting sign-in
  
      // Sign in with Google
      const { exist } = await formSignIn(); 
  
      // If user exists, redirect to admin page
      if (exist) {
        router.push("/admin");
      } else {
        // User does not exist, store this information in local storage
        window.location.reload();
        localStorage.setItem('userExists', 'false');
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
    }
  };  

  useEffect(() => {
    const userExistsInStorage = localStorage.getItem('userExists');
    if (userExistsInStorage === 'false') {
      setUserExists(false);
      // Clear the item from local storage
      localStorage.removeItem('userExists');
    }
  }, []);

    return (
    <div className="pl-20 bg-sky-100 max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto text-base leading-6 max-md:mt-10 max-md:max-w-full">
          <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets%2Fe4fb5c3f22154b41a48f253e88461b6a%2Fd2a1dd3df5d142afa65ab6c39126eb13"
              className="self-center max-w-full"
            />
            <div className="flex flex-col items-start px-10 py-11 mt-10 bg-white rounded-xl shadow-sm max-md:px-5 max-md:max-w-full">
              <div className="text-2xl font-bold leading-8 text-violet-900">
                Hi, Welcome back!
              </div>
              <div className="mt-4 text-neutral-400">
                Enter your credentials to continue.
              </div>
              {!userExists && ( 
                <div className="mt-2 text-red-500">User does not exist.</div>
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
          <div className="flex overflow-hidden relative flex-col grow items-center px-20 py-12 min-h-[1024px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb989dd4f54f6edf7b5a60b08b7c6f11ba925599b4a6e8bdec8ec5c5dadfa353?"
              className="object-cover absolute inset-0 size-full"
            />
            <div className="relative text-4xl font-bold leading-10 text-center whitespace-nowrap mt-[717px] text-neutral-800 max-md:mt-10">
              VSU Bind
            </div>
            <div className="relative mt-4 text-base font-medium leading-6 text-center whitespace-nowrap text-neutral-500">
              Thesis Binding Made Easy
            </div>
            <div className="flex relative flex-col justify-center py-2.5 pr-14 pl-5 mt-4 w-28 max-w-full max-md:pr-5">
              <div className="shrink-0 h-1.5 bg-violet-400 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
