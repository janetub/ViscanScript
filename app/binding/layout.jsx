/*
  layout.js
*/

"use client";

import Navbar from "@/components/Navbar";
import "../../styles/globals.css";
import { UserAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const { user, isLoading } = UserAuth();
  const router = useRouter();
  const isSignedIn = user !== null;

  useEffect(() => {
    if (!isSignedIn && !isLoading) {
      router.push("/binding/login");
    } else {
      router.push("/binding");
    }
  }, [isSignedIn, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {isSignedIn && <Navbar />}
      {children}
    </>
  );
}
