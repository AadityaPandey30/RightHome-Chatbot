'use client';

import { MdArrowBackIosNew } from "react-icons/md";

export default function Sidebar({ isExpanded, toggleSidebar, chatHistory }) {
  return (
    <div
      className={`h-full bg-[#F7F2FA] text-gray-600 z-10 transition-all duration-300 
        ${isExpanded ? 'w-32 md:w-64' : 'w-[34px] md:w-[68px]'} 
        ${isExpanded ? 'fixed md:relative' : 'absolute md:relative'} 
        ${isExpanded ? 'left-0' : '-left-full'} 
        md:left-0 
        top-0
        flex flex-col justify-between p-1 md:p-4`}
    >
      {/* Sidebar Header */}
      <div className={`transition-opacity duration-300 mt-20 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <h2 className="text-2xl font-bold">Chat History</h2>
        <ul className="mt-4 space-y-4 absolute bottom-3 left-[8%]">
          {chatHistory.map((chat, index) => (
            <li key={index} className="cursor-pointer">
              <div className="font-bold">{chat.title}</div>
              <div className="text-sm text-gray-500">{chat.date}</div>
            </li>
          ))}
        </ul>
        {/* Sidebar Header */}
      
        <ul className="mt-4 space-y-4 absolute bottom-3 left-[8%]">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Profile</li>
          <li className="cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Toggle button */}
      <div className="mt-auto">
        <button
          className={`bg-[#E6E0E9] text-black shadow-sm shadow-gray-500 p-3 rounded-lg w-fit absolute top-4 transition-transform duration-300 
            ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
          onClick={toggleSidebar}
        >
          <MdArrowBackIosNew />
        </button>
      </div>
    </div>
  );
}
