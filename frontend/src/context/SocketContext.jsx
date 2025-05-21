import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  connectSocketService,
  disconnectSocketService,
} from "../services/socketService";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { authUser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);  // Track users who are typing

  const handleOnlineUsers = (userIds) => setOnlineUsers(userIds);

  const handleTyping = ({ from }) => {
    setTypingUsers((prev) => {
      if (!prev.includes(from)) return [...prev, from];
      return prev;
    });
  };

  const handleStopTyping = ({ from }) => {
    setTypingUsers((prev) => prev.filter((id) => id !== from));
  };

  useEffect(() => {
    let newSocket = null;

    if (authUser) {
      newSocket = connectSocketService(authUser, handleOnlineUsers, handleTyping, handleStopTyping);
      setSocket(newSocket);
    } else {
      if (socket) disconnectSocketService(socket);
      setSocket(null);
      setOnlineUsers([]);
      setTypingUsers([]);
    }

    return () => {
      if (newSocket) disconnectSocketService(newSocket);
      setSocket(null);
      setOnlineUsers([]);
      setTypingUsers([]);
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, typingUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
