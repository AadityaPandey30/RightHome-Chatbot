'use client';

import Image from 'next/image';
import profile from "../../../public/assets/profile.png";
import logo from "../../../public/assets/logo-right.png";

export default function ChatArea({ messages }) {
  return (
    <div className="h-[80vh] max-w-3xl m-auto overflow-y-scroll p-1 md:p-4">
      {messages.map((msg, index) => {
        const isUserMessage = index % 2 == 0; // Assuming even index for bot, odd for user (you can adjust this based on your logic)
        return (
          <div
            key={index}
            className="flex items-center mb-4"
          >
            {/* Display profile picture or logo based on the message origin */}
            {!isUserMessage && (
              <Image
                src={logo} // Bot's logo
                alt="Bot Logo"
                className="h-5 w-10 mr-2 rounded-full"
              />
            )}

            {isUserMessage && (
              <Image
                src={profile} // User's profile image
                alt="User Profile"
                className="h-8 w-8 mr-3 ml-1 rounded-full"
              />
            )}

            {/* Message content */}
            <div
              className={`p-3 rounded-lg ${
                isUserMessage
                  ? ' text-blue-800 self-end'
                  : ' text-black self-start'
              }`}
            >
              {msg}
            </div>
          </div>
        );
      })}
    </div>
  );
}
