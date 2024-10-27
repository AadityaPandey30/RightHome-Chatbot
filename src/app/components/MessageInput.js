'use client';

import { useState } from 'react';
import { BiSend } from "react-icons/bi";

export default function MessageInput({ onSendMessage, sidebarExpanded }) {
  const [message, setMessage] = useState('');

  // Function to handle message send
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(''); // Clear the input box after sending
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSend();
    }
  };

  // Adjust margin based on sidebar state
  const inputMargin = sidebarExpanded ? 'ml-48' : 'ml-20'; // Match this with the ChatPage

  return (
    <div className={`w-full fixed bottom-0 left-0 transition-all duration-300 ${inputMargin}`}>
      <div className="flex items-center bg-[#ECE6F0] rounded-[34px] py-3 px-5 w-full max-w-4xl m-auto mb-3">
        {/* Input box */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress} // Enter key event
          placeholder="Enter a prompt here"
          className="flex-grow p-2 bg-transparent text-gray-800 rounded-lg text-[17px] outline-none"
        />

        {/* Animated Send Button */}
        <button
          onClick={handleSend}
          className={`ml-2 p-2 text-2xl text-black transition-transform duration-800 ${
            message.trim() ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <BiSend />
        </button>
      </div>
      <p className="text-gray-400 text-center text-[13px] mb-3">I can make mistakes. So double-check it.</p>
    </div>
  );
}
