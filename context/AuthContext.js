/*
 * context/AuthContext.js
 * This file defines the AuthContext and AuthContextProvider components,
 * which manage authentication state using Firebase Authentication in a React application.
 */

"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { printUserEntries, checkIfUserExists, checkIfEmailExistsInCollections } from "../utils/userUtils";

const AuthContext = createContext();

/**
 * AuthContextProvider component manages the authentication state.
 * It provides functions for signing in with Google, logging out, and access to the authentication state.
 * @param {Object} children - React components to be wrapped by the AuthContextProvider
 */
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const [authChecking, setAuthChecking] = useState(false);
  const [failedAttempt, setFailedAttempt] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

   const adminSignIn = async () => {
    setAuthChecking(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithRedirect(auth, provider);
      console.log("Admin sign-in result: ", result);
      const exists = await checkIfUserExists(result.user.email, "administrators");
      console.log("Document data:", result.user.email);
      if (!exists) {
        console.log("User does not exist in the 'administrators' collection.");
        signOut(auth);
        setFailedAttempt(true);
        return { exist: false, user: result.user };
      }
      setLoggedIn(true);
      return { exist: true, user: result.user };
    } catch (error) {
      console.error("Error occurred during admin sign-in:", error);
      return { exist: false, user: null };
    } finally {  
      setAuthChecking(false);
    }
  };

  const staffSignIn = async () => {
    setAuthChecking(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithRedirect(auth, provider);
      console.log("Staff sign-in result: ", result);
      const exists = await checkIfUserExists(result.user.email, "manuscriptCheckingLibraryStaff");
      console.log("Document data:", result.user.email);
      // printUserEntries("manuscriptCheckingLibraryStaff");
      if (!exists) {
        console.log("User does not exist in the 'manuscriptCheckingLibraryStaff' collection.");
        signOut(auth);
        setFailedAttempt(true);
        return { exist: false, user: result.user };
      }
      setLoggedIn(true);
      return { exist: true, user: result.user };
    } catch (error) {
      console.error("Error occurred during staff sign-in:", error);
      return { exist: false, user: null };
    } finally {  
      setAuthChecking(false);
    }
  };

  const formSignIn = async () => {
    setAuthChecking(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithRedirect(auth, provider);
      console.log("Student sign-in result: ", result);

      // Check if user's email ends with @vsu.edu.ph
      const email = result.user.email;
      const isVSUEmail = email.endsWith('@vsu.edu.ph');
      console.log("Email:", email);

      if (!isVSUEmail) {
        console.log("User's email does not end with @vsu.edu.ph.");
        signOut(auth);
        setFailedAttempt(true);
        return { exist: false, user: result.user };
      }
      
      return { exist: true, user: result.user };
    } catch (error) {
      console.error("Error occurred during student sign-in:", error);
      return { exist: false, user: null };
    } finally {  
      setAuthChecking(false);
    }
  };

  const logOut = async () => {
    try {
      await auth.signOut();
      setLoggedIn(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Effect to listen for authentication state changes
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, [auth]);

  // Provide the authentication state and functions to children components through context
  return (
    <AuthContext.Provider value={{ user, setUser, authChecking, failedAttempt, isLoggedIn, adminSignIn, staffSignIn, formSignIn, logOut, auth }}>
      {children}
    </AuthContext.Provider>
  );  
};

/**
 * Custom hook to access authentication state and functions.
 * @returns {Object} - Object containing authentication state and functions
 */
export const UserAuth = () => {
  return useContext(AuthContext);
};
