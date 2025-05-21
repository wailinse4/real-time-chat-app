// src/components/MessageList.jsx
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext"; // To determine own messages
import { useChat } from "../context/ChatContext"; // To access selectedUser
import { formatMessageTime } from "../lib/utils"; // For message timestamp formatting
import MessageSkeleton from "./skeletons/MessageSkeleton"; // For loading state

const MessageList = () => {
  const { messages, isMessagesLoading, selectedUser } = useChat();
  const { authUser } = useAuth(); // Get authenticated user to check sender
  const messageEndRef = useRef(null); // Ref for auto-scrolling

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current && messages) {
      // Use a timeout to ensure DOM updates before scrolling
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  if (isMessagesLoading) {
    return <MessageSkeleton />; // Show skeleton while loading messages
  }

  // Display message if no user is selected or no messages yet
  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-base-content/70">
        <p>Select a user to start chatting!</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-base-content/70">
        <p>Say hello to {selectedUser.fullName}! 👋</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const isOwnMessage = message.senderId === authUser?._id;
        const isLastMessage = index === messages.length - 1;
        return (
          <div
            key={message._id}
            className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
            ref={isLastMessage ? messageEndRef : null} // Attach ref to the last message
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    isOwnMessage
                      ? authUser?.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 object-cover"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;