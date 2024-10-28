'use client';

import { MdArrowBackIosNew } from "react-icons/md";

export default function Header({ sidebarExpanded, toggleSidebar }) {
    return (
      <div
        className={`flex justify-between items-center bg-white text-black px-6 py-4 h-16 fixed top-0 z-30 transition-all duration-300 ${
          sidebarExpanded ? 'w-[calc(100%-20rem)]' : 'w-[calc(100%-4rem)]'
        }`} // Adjust width based on sidebar size
      >

        {/* Toggle button */}
      {/* <div className="mt-auto">
        <button
          className={`bg-[#E6E0E9] text-black shadow-sm shadow-gray-500 p-3 rounded-lg w-fit fixed top-4 left-4 transition-transform duration-300 
            ${sidebarExpanded ? 'rotate-0 md:opacity-0' : 'rotate-180'} `}
          onClick={toggleSidebar}
        >
          <MdArrowBackIosNew />
        </button>
       </div> */}

        {/* Company Logo */}
        <div className="text-xl font-bold cursor-pointer">
          <img src="/assets/logo-right.png" alt="Company Logo" className="h-12" /> {/* Replace with your logo path */}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4 cursor-pointer">
          <img
            src="/assets/profile.jpeg" // Replace with actual profile image
            alt="User Profile"
            className="h-10 w-10 rounded-full border-gray-400 border-2 mr-2 fixed right-4"
          />
        </div>
      </div>
    );
  }
  