'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState, useRef } from 'react';
import profile from "../../../public/assets/profile.jpeg";
import logo from "../../../public/assets/logo-right.png";
import Loader from './Loader';

export default function ChatArea({ messages, isLoading }) {
  const [displayedText, setDisplayedText] = useState('');
  const bottomRef = useRef(null);

  // Animate bot response text
  const animateBotReply = async (text) => {
    if (!text) return;
    let displayed = '';
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      displayed += (i > 0 ? ' ' : '') + words[i];
      setDisplayedText(displayed);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  };

  // Trigger animation for the latest bot message
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && !lastMessage.isUser) {
      animateBotReply(lastMessage.text);
    }
  }, [messages]);

  // Scroll to the bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[80vh] max-w-3xl m-auto overflow-y-scroll p-1 my-10 md:p-4">
      {messages.map((msg, index) => (
        <div key={index} className={`flex items-center mb-4 ${msg.isUser ? 'flex-row-reverse' : ''}`}>
          {!msg.isUser && (
            <Image src={logo} alt="Bot Logo" className="h-5 w-10 mr-2 rounded-full" />
          )}
          {msg.isUser && (
            <Image src={profile} alt="User Profile" className="h-8 w-8 mr-3 ml-1 rounded-full" />
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-3 rounded-lg ${msg.isUser ? 'text-blue-800' : 'text-black'}`}
          >
            {msg.isUser ? (
              msg.text
            ) : (
              // Show loader for the last bot message if loading, else animate the reply
              isLoading && index === messages.length - 1 ? <Loader /> : <ReactMarkdown>{index === messages.length - 1 ? displayedText : msg.text}</ReactMarkdown>
            )}
          </motion.div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
