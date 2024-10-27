'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import MessageInput from './MessageInput';
import Header from './Header';
import Welcome from './Welcome'; // Import the new Welcome component

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleSendMessage = (message) => {
    if (message) {
      setMessages([...messages, message]);
    }
  };

  const handlePromptClick = (prompt) => {
    setMessages([...messages, prompt]);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Dynamically adjust the margin based on sidebar state
  const contentMargin = sidebarExpanded ? 'ml-16' : 'ml-2'; // Adjust based on sidebar width

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isExpanded={sidebarExpanded} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className={`flex flex-col flex-1 bg-white transition-all duration-300 ${contentMargin}`}>
        {/* Fixed Header */}
        <Header sidebarExpanded={sidebarExpanded} />

        {/* Chat area */}
        <div className="flex-grow">
          {/* Conditionally render WelcomeComponent or ChatArea */}
          {messages.length === 0 ? (
            <Welcome onPromptClick={handlePromptClick} />
          ) : (
            <ChatArea messages={messages} />
          )}
        </div>

        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} sidebarExpanded={sidebarExpanded} />
      </div>
    </div>
  );
}
