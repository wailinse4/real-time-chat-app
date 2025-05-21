// src/services/socketService.js
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const connectSocketService = (user, onOnlineUsersUpdate) => {
  if (!user) return null;

  const socket = io(BASE_URL, { query: { userId: user._id } });
  socket.connect();

  socket.on("connect", () => console.log("Socket connected:", socket.id));
  socket.on("disconnect", (reason) => console.log("Socket disconnected:", reason));
  socket.on("getOnlineUsers", (userIds) => {
    console.log("Received online users update:", userIds);
    onOnlineUsersUpdate(userIds);
  });

  return socket;
};

export const disconnectSocketService = (socket) => {
  if (socket?.connected) {
    socket.disconnect();
    console.log("Socket disconnected manually");
  }
};
