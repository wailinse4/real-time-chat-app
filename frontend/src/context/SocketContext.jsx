// src/context/SocketContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";  // <-- useAuth to get authUser
import {
  connectSocketService,
  disconnectSocketService,
} from "../services/socketService";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { authUser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const handleOnlineUsers = (userIds) => setOnlineUsers(userIds);

  useEffect(() => {
    let newSocket = null;

    if (authUser) {
      newSocket = connectSocketService(authUser, handleOnlineUsers);
      setSocket(newSocket);
    } else {
      if (socket) disconnectSocketService(socket);
      setSocket(null);
      setOnlineUsers([]);
    }

    return () => {
      if (newSocket) disconnectSocketService(newSocket);
      setSocket(null);
      setOnlineUsers([]);
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
