"use client";

import CreateBindingModal from "@/components/CreateBindingModal";
import React from "react";

const CreateBindingePage = () => {
  return (
    <div>
      <CreateBindingModal isOpen={true} />
    </div>
  );
};

export default CreateBindingePage;