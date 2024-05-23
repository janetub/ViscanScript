/*
 * context/AuthContext.js
 * This file defines the AuthContext and AuthContextProvider components,
 * which manage authentication state using Firebase Authentication in a React application.
 */

"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithRedirect,
  onAuthStateChanged,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { checkIfUserExists } from "@/utils/userUtils";

const AuthContext = createContext();

/**
 * AuthContextProvider component manages the authentication state.
 * It provides functions for signing in with Google, logging out, and access to the authentication state.
 * @param {Object} children - React components to be wrapped by the AuthContextProvider
 */
export function AuthContextProvider({ children }) {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isFailedAttempt, setIsFailedAttempt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfilePhoto, setUserProfilePhoto] = useState(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setIsAuthChecking(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Error in useEffect: ", error);
    }
  }, [auth]);

  useEffect(() => {
    if (currentUser) {
      setUserProfilePhoto(currentUser.photoURL);
    }
  }, [currentUser]);

  const redirect = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
    }
  };

  const handleRedirectResult = async (page) => {
    if (currentUser && isLoggedIn) {
      try {
        const result = await getRedirectResult(auth);
        await checkAuthorization(result.user, page);
      } catch (error) {
        console.error(`Error occurred during ${page} sign-in:`, error);
      }
    }
  };

  const checkAuthorization = async (user, page) => {
    setIsAuthChecking(true);
    let exists = false;
    try {
      if (page === "admin") {
        exists = await checkIfUserExists(user.email, "administrators");
      } else if (page === "dashboard") {
        exists = await checkIfUserExists(
          user.email,
          "manuscriptCheckingLibraryStaff",
        );
      } else if (page === "form") {
        exists = user.email.endsWith("@vsu.edu.ph");
      }
    } catch (error) {
      console.error(
        `Error occurred during ${page} authorization check:`,
        error,
      );
    }
    if (!exists) {
      // console.log(`User does not exist in the '${page}' authorized users collection(s).`);
      setIsFailedAttempt(true);
      logOut();
    } else {
      setIsLoggedIn(true);
    }
  };

  const logOut = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      setIsAuthChecking(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Provide the authentication state and functions to children components through context
  return (
    <AuthContext.Provider
      value={{
        userProfilePhoto,
        auth,
        currentUser,
        isAuthChecking,
        isFailedAttempt,
        isLoggedIn,
        setIsAuthChecking,
        redirect,
        handleRedirectResult,
        checkAuthorization,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication state and functions.
 * @returns {Object} - Object containing authentication state and functions
 */
export function UserAuth() {
  return useContext(AuthContext);
}
