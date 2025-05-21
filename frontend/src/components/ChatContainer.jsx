// src/components/ChatContainer.jsx (Updated)
import { useEffect } from "react";
import { useChat } from "../context/ChatContext";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList"; // Import the new component
import NoChatSelected from "./NoChatSelected"; // Import NoChatSelected

const ChatContainer = () => {
  const { getMessages, selectedUser, isMessagesLoading } = useChat();

  // Load messages when selectedUser changes
  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
  }, [selectedUser?._id, getMessages]); // Depend on selectedUser._id and getMessages

  // If no user is selected, show the "No Chat Selected" component
  if (!selectedUser) {
    return <NoChatSelected />;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />

      {/* Message List component now handles messages and loading state */}
      <MessageList />

      <MessageInput />
    </div>
  );
};

export default ChatContainer;