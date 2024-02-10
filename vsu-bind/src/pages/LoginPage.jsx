import * as React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Perform the login operation
    login();
    // Redirect to the root route after login
    navigate("/");
  };

  return (
    <div className="pl-20 bg-sky-100 max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch my-auto text-base leading-6 max-md:mt-10 max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5818be7a04459f35b2955cff0aa862ebffc156e428161f60b97611671944369b?"
              className="self-center max-w-full aspect-[2.22] w-[434px]"
            />
            <div className="flex flex-col items-start px-10 py-11 mt-10 bg-white rounded-xl shadow-sm max-md:px-5 max-md:max-w-full">
              <div className="text-2xl font-bold leading-8 text-violet-900">
                Hi, Welcome back
              </div>
              <div className="mt-4 text-neutral-400">
                Enter your credentials to continue
              </div>
              <div className="flex justify-center items-center self-stretch px-16 py-2 mt-8 font-medium whitespace-nowrap rounded-xl border border-solid bg-neutral-50 border-[color:var(--Grey-200,#F5F5F5)] text-neutral-500 max-md:px-5 max-md:max-w-full">
                <div className="flex gap-3">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc46bf46b46bd2574f8bfe907942abe3811ef34f55f793132597751423ae3b13?"
                    className="w-8 aspect-square"
                  />
                  <div className="grow my-auto" onClick={handleLogin}>
                    Sign in with google
                  </div>
                </div>
              </div>
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
              Make Binding Your Thesis Easier
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
