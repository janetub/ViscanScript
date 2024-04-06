  /**
   * app/dashboard/login/page.jsx
   * 
   */

  "use client";
  import { useEffect, useState } from "react";
  import { UserAuth } from "@/context/AuthContext";
  import Image from "next/image";
  import vsuScript from "@/public/images/vsuscript/vsuscript-logo-black.png"
  import googleLogo from "@/public/images/google.svg"
import { useRouter } from "next/navigation";

  
  function LoginPage({ callingComponent }) {
    const { user, setUser, formSignIn, staffSignIn, failedAttempt } = UserAuth();
    const router = useRouter();

    const handleSignIn = async () => {
      try { 
        let exist, signedInUser;
        let route;

        if(callingComponent === "DashboardPage")
        {
          ({exist, user: signedInUser} = await staffSignIn());
          route = "/dashboard";
        }
        else if(callingComponent === "CreateBindingePage") {
          ({exist, user: signedInUser} = await formSignIn());
          route = "/form";
        } else {
          exist = false;
        }
    
        if (exist) {
          localStorage.setItem('user', JSON.stringify(signedInUser)); 
          setUser(user);
          router.push(router);
        }
      } catch (error) {
        console.error("Error occurred during sign-in: ", error);
      }
    };  

    return (
      <div className="pl-20 bg-sky-100 max-md:pl-5">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto text-base leading-6 max-md:mt-10 max-md:max-w-full">
              {/* VSU Script Logo */}
              <Image
                loading="lazy"
                src={vsuScript}
                className="self-center max-w-full"
              />
              <div className="flex flex-col items-start px-10 py-11 bg-white rounded-xl shadow-sm max-md:px-5 max-md:max-w-full">
                <div className="text-2xl font-bold leading-8 text-violet-900">
                  Hi, Welcome back!
                </div>
                <div className="mt-4 text-neutral-400">
                  Please use the university-provided email.
                </div>
                {failedAttempt && ( 
                  <div className="mt-2 text-red-500">Invalid email. Please reload the page and try again.</div>
                )}
                <button
                  className="flex justify-center items-center self-stretch px-16 py-2 mt-8 font-medium whitespace rounded-xl border border-solid bg-neutral-50 border-[color:var(--Grey-200,#F5F5F5)] text-neutral-500 max-md:px-5 max-md:max-w-full hover:bg-gray-200 focus:bg-gray-200 transition duration-300 ease-in-out"
                  onClick={handleSignIn}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      loading="lazy"
                      src={googleLogo}
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
              {/* banner */}
              <div className="object-cover absolute inset-0 size-full">
                <div className="h-full w-full bg-white rounded-lg flex items-center justify-center text-gray-500 text-lg font-bold">
                  Banner Placeholder
                </div>
              </div>
              <div className="relative text-4xl font-bold leading-10 text-center whitespace-nowrap mt-[717px] text-neutral-800 max-md:mt-10">
                Viscan Script
              </div>
              <div className="relative mt-4 text-base font-medium leading-6 text-center whitespace-nowrap text-neutral-500">
                Thesis Binding Order Request and Management Made Easy
              </div>
              <div className="flex relative flex-col justify-center items-center py-2.5 mt-4 w-28 max-w-full max-md:pr-5">
                <div className="shrink-0 h-1.5 bg-violet-400 rounded-xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );  
  }

  export default LoginPage;
