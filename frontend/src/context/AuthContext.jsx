// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  checkAuthService,
  signupService,
  loginService,
  logoutService,
  updateProfileService,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuth = async () => {
    try {
      const user = await checkAuthService();
      setAuthUser(user);
    } catch (error) {
      console.log("Error in checkAuth:", error);
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const signup = async (data) => {
    setIsSigningUp(true);
    try {
      const user = await signupService(data);
      setAuthUser(user);
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSigningUp(false);
    }
  };

  const login = async (data) => {
    setIsLoggingIn(true);
    try {
      const user = await loginService(data);
      setAuthUser(user);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setAuthUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const updateProfile = async (data) => {
    setIsUpdatingProfile(true);
    try {
      const user = await updateProfileService(data);
      setAuthUser(user);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in updateProfile:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isSigningUp,
        isLoggingIn,
        isUpdatingProfile,
        isCheckingAuth,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
