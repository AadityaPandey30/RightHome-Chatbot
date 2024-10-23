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

  // Adjust margin based on sidebar state
const inputMargin = sidebarExpanded ? 'ml-64' : 'ml-2'; // Match this with the ChatPage

  return (
    <div className={`flex h-screen`}>
  {/* Sidebar */}
  <Sidebar isExpanded={sidebarExpanded} toggleSidebar={toggleSidebar} />

  {/* Main content area */}
  <div className={`flex flex-col flex-1 bg-white transition-all duration-300 ml-0 md:ml-4 ${inputMargin}`}>
    {/* Fixed Header */}
    <Header sidebarExpanded={sidebarExpanded} toggleSidebar={toggleSidebar} />

    {/* Chat area */}
    <div className="flex-grow my-10 pl-2">
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