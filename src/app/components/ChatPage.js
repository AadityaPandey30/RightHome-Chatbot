'use client';

import { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import MessageInput from './MessageInput';
import Header from './Header';
import Welcome from './Welcome';

const api_url = "https://vercel-pexapi.vercel.app/";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [chatHistory, setChatHistory] = useState([]); // State for chat history
  const [bufferMemory, setBufferMemory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    // Add the user message to chat history
    const updatedChatHistory = [
      ...chatHistory,
      { role: "user", content: userInput },
    ];
    setChatHistory(updatedChatHistory);
    
    try {
      setIsLoading(true);
      const response = await axios.post(
        api_url + "chat",
        {
          chat_history: updatedChatHistory,
          buffer_memory: bufferMemory,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      setBufferMemory(data.buffer_memory);
      const botReply = data["bot_reply"];
      updatedChatHistory.push({ role: "assistant", content: botReply });
      setChatHistory(updatedChatHistory); // Update chat history with bot reply

      const filteredMessages = updatedChatHistory.filter(
        (message) => message.role === "user" || message.role === "assistant"
      );

      setMessages(
        filteredMessages.map((message) => ({
          text: message.content,
          isUser: message.role === "user",
        }))
      );

      // Update chat history only on the first response
      if (filteredMessages.length === 1) { // Check if this is the first interaction
        const date = new Date().toLocaleDateString(); // Get current date
        const title = userInput.length > 3 ? userInput.slice(0, 3) : userInput; // Brief title from user input
        setChatHistory(prev => [...prev, { title, date }]); // Add to chat history
      }

      setIsLoading(false);

      // Trigger typing animation for bot's reply
      animateBotReply(botReply);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handlePromptClick = (prompt) => {
    sendMessage(prompt); // Assuming sendMessage can accept the prompt directly
  };

  const handleSendMessage = (message) => {
    if (message) {
      sendMessage(message);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        isExpanded={sidebarExpanded} 
        toggleSidebar={toggleSidebar} 
        chatHistory={chatHistory} // Pass chat history to Sidebar
      />

      <div className={`flex flex-col flex-1 bg-white transition-all duration-300 ${sidebarExpanded ? 'ml-16' : 'ml-2'}`}>
        <Header sidebarExpanded={sidebarExpanded} />

        <div className="flex-grow">
          {messages.length === 0 ? (
            <Welcome onPromptClick={handlePromptClick} />
          ) : (
            <ChatArea messages={messages} />
          )}
        </div>

        <MessageInput onSendMessage={handleSendMessage} sidebarExpanded={sidebarExpanded} isLoading={isLoading} />
      </div>
    </div>
  );
}
