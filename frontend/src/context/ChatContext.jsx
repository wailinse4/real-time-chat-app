// src/context/ChatContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketContext";  // <-- Import socket context here

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { authUser } = useAuth();
  const { socket } = useSocket();          // <-- Get socket from SocketContext

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  // Load users
  const getUsers = useCallback(async () => {
    setIsUsersLoading(true);
    try {
      const res = await axiosInstance.get("/messages/users");
      setUsers(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setIsUsersLoading(false);
    }
  }, []);

  // When users change, if no selectedUser, pick first by default
  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users, selectedUser]);

  // Load messages for selected user
  const getMessages = useCallback(async (userId) => {
    if (!userId) return;
    setIsMessagesLoading(true);
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      setMessages(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      setIsMessagesLoading(false);
    }
  }, []);

  // When selectedUser changes, load messages for them
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    } else {
      setMessages([]); // Clear messages if no user selected
    }
  }, [selectedUser, getMessages]);

  // Send a message
  const sendMessage = useCallback(
    async (messageData) => {
      if (!selectedUser || !socket) return;
      try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
        setMessages((prev) => [...prev, res.data]);

        // Emit new message over socket for real-time update to others
        socket.emit("sendMessage", {
          to: selectedUser._id,
          message: res.data,
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send message");
      }
    },
    [selectedUser, socket]
  );

  // Listen for new messages via socket
  useEffect(() => {
    if (!socket || !selectedUser) return;

    const handleNewMessage = (newMessage) => {
      // Add message if it belongs to the current conversation
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser]);

  // On mount, load users
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        users,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        authUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
