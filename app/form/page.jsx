/**
 * app/form/page.jsx
 * 
 * submission form
 */

"use client";

import CreateBindingModal from "@/components/CreateBindingModal";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CreateBindingePage = () => {
  const { user, isLoading } = UserAuth();
  const router = useRouter();
  const isSignedIn = user !== null;

  return <CreateBindingModal isOpen={true} />;
};

export default CreateBindingePage;