"use client";

import CreateBindingModal from "@/components/BindingRequestForm";
import React from "react";

const CreateBindingePage = () => {
  return (
    <div>
      <CreateBindingModal isOpen={true} />
    </div>
  );
};

export default CreateBindingePage;