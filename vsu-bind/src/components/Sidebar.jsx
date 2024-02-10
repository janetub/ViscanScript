import React from "react";

// Import the home icon image
import homeIcon from "../assets/home.png";
import logo from "../assets/logo.png"; // Adjust the path as necessary

function Sidebar() {
  return (
    <div className="sticky top-0 flex flex-col justify-between bg-gray-800 w-20 h-screen">
      <div className="flex flex-col items-center">
        <div className="w-full bg-blue-800 p-4">
          <img src={logo} alt="VB Logo" className="h-12 mx-auto" />
        </div>
        {/* Replace each icon div with Tailwind classes */}
        <div className="mb-4">
          <img src={homeIcon} alt="Home" className="w-8 h-8" />
        </div>
        {/* Repeat for other icons */}
        <div className="mb-4">
          <img src={homeIcon} alt="Home" className="w-8 h-8" />
        </div>
        {/* ... */}
      </div>
      <div className="flex flex-col items-center mb-4">
        <img
          src={homeIcon}
          alt="User"
          className="w-10 h-10 rounded-full mb-2"
        />
        <span className="text-white text-sm">Jane_D</span>
      </div>
    </div>
  );
}

export default Sidebar;
