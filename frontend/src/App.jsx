import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";       // Auth context
import { useChat } from "./context/ChatContext";       // Chat context
import { useTheme } from "./context/ThemeContext";     // Theme context
import { useSocket } from "./context/SocketContext";   // <-- Import Socket context here

import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  // Use context hooks
  const { authUser, isCheckingAuth, checkAuth } = useAuth();
  const { users: chatUsers } = useChat();
  const { theme } = useTheme();

  // Get onlineUsers from Socket context now
  const { onlineUsers } = useSocket();

  console.log({ onlineUsers, chatUsers });

  useEffect(() => {
    if (checkAuth) checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
