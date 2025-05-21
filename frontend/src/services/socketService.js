import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const connectSocketService = (user, onOnlineUsersUpdate, onTyping, onStopTyping) => {
  if (!user) return null;

  const socket = io(BASE_URL, { query: { userId: user._id } });
  socket.connect();

  socket.on("connect", () => console.log("Socket connected:", socket.id));
  socket.on("disconnect", (reason) => console.log("Socket disconnected:", reason));
  socket.on("getOnlineUsers", (userIds) => {
    console.log("Received online users update:", userIds);
    onOnlineUsersUpdate(userIds);
  });

  // Typing event listeners
  socket.on("typing", (data) => {
    onTyping(data);
  });

  socket.on("stopTyping", (data) => {
    onStopTyping(data);
  });

  return socket;
};

export const disconnectSocketService = (socket) => {
  if (socket?.connected) {
    socket.disconnect();
    console.log("Socket disconnected manually");
  }
};

// New functions to emit typing events
export const emitTyping = (socket, toUserId) => {
  if (socket) socket.emit("typing", { to: toUserId });
};

export const emitStopTyping = (socket, toUserId) => {
  if (socket) socket.emit("stopTyping", { to: toUserId });
};
