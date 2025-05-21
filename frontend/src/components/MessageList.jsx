import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { useSocket } from "../context/SocketContext";
import { formatMessageTime } from "../lib/utils";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import TypingIndicator from "./TypingIndicator";

const MessageList = () => {
  const { messages, isMessagesLoading, selectedUser } = useChat();
  const { authUser } = useAuth();
  const { typingUsers } = useSocket();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  if (isMessagesLoading) {
    return <MessageSkeleton />;
  }

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

  const isTyping = typingUsers.includes(selectedUser._id);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        const isOwnMessage = message.senderId === authUser?._id;
        const isLastMessage = index === messages.length - 1;
        return (
          <div
            key={message._id}
            className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
            ref={isLastMessage ? messageEndRef : null}
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

      {isTyping && <TypingIndicator />}

      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;
