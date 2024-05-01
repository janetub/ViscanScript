/**
 * components/Navbar.jsx
 * houses navigation and login/signup buttons
 * TODO: when screen width get's reduced, clean elements into a expansion button
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/globals.css";

const Navbar = () => {
  const { user, setUser, googleSignIn, logOut, auth } = UserAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const userData = await googleSignIn(); // Using googleSignIn function from
      // console.log("Signing in...", userData);
      // console.log("User data after signing in:", userData);
      // if (!userData.exist) {
      //   console.log(
      //     "User does not exist in database. Redirecting to registration form...:",
      //     userData,
      //   );
      //   await logOut();
      //   router.push(
      //     `/dashboard/registration-form?email=${userData.user.email}`,
      //   );
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [setUser]); //

  // return (
  //   <div className="shadow-md">
  //     <div className="flex items-center justify-between px-6 py-5 bg-white">
  //     <ul className="flex space-x-4">
        

  //       {!user ? null : (
  //         <li className="text-xl text-gray-700">
  //           <Link href="/profile">Profile</Link>
  //         </li>
  //       )}
  //     </ul>

  //     {!user ? (
  //       <ul className="flex">
  //         <li onClick={handleSignIn} className="px-4 py-2 bg-blue-500 text-white rounded-md">
  //           Sign in with Google
  //         </li>
  //       </ul>
  //     ) : (
  //       <div className="flex items-center space-x-4">
  //         <p className="text-xl text-gray-700">Welcome, {user.displayName}</p>
  //         <p className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSignOut}>
  //           Sign out
  //         </p>
  //       </div>
  //     )}
  //   </div>
  //   </div>
  // );

  // Inside your JSX code
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-5 bg-white">
        <ul className="flex space-x-4">
          <li className="text-xl text-gray-700">
            <Link href="/">Home</Link>
          </li>
          <li className="text-xl text-gray-700">
            <Link href="/about">About</Link>
          </li>
        </ul>

        {!user ? (
          <ul className="flex">
            <li onClick={handleSignIn} className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Sign in with Google
            </li>
          </ul>
        ) : (
          <div className="flex items-center space-x-4">
            <p className="text-xl text-gray-700">Welcome, {user.displayName}</p>
            <p className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSignOut}>
              Sign out
            </p>
          </div>
        )}
      </div>
    </div>
  );

};

export default Navbar;
