'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import profile from "../../../public/assets/profile.jpeg";
import logo from "../../../public/assets/logo-right.png";
import { useEffect, useState, useRef } from 'react';

export default function ChatArea({ messages }) {
  const [displayedText, setDisplayedText] = useState('');
  const bottomRef = useRef(null); // Reference for auto-scroll

  // Animate text word by word for the bot response
  const animateBotReply = async (text) => {
    if (!text) return; // Ensure text is valid
    let displayed = '';
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      displayed += (i > 0 ? ' ' : '') + words[i];
      setDisplayedText(displayed);
      await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust typing speed here
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isUser) {
      animateBotReply(lastMessage.text); // Ensure lastMessage.text is defined
    }
  }, [messages]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[80vh] max-w-3xl m-auto overflow-y-scroll p-1 mt-10 md:p-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-center mb-4 ${msg.isUser}`}
        >
          {/* Display profile picture or logo based on the message origin */}
          {!msg.isUser && (
            <Image
              src={logo}
              alt="Bot Logo"
              className="h-5 w-10 mr-2 rounded-full"
            />
          )}

          {msg.isUser && (
            <Image
              src={profile}
              alt="User Profile"
              className="h-8 w-8 mr-3 ml-1 rounded-full"
            />
          )}

          {/* Message content with Markdown for bot messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-3 rounded-lg ${msg.isUser ? ' text-blue-800' : ' text-black'}`}
          >
            {msg.isUser ? (
              msg.text
            ) : (
              <ReactMarkdown>{index === messages.length - 1 ? displayedText : msg.text}</ReactMarkdown>
            )}
          </motion.div>
        </div>
      ))}
      {/* Dummy div for automatic scrolling */}
      <div ref={bottomRef} />
    </div>
  );
}
