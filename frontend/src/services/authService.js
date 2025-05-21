// src/services/authService.js
import { axiosInstance } from "../lib/axios";

export const checkAuthService = async () => {
  const res = await axiosInstance.get("/auth/check");
  return res.data;
};

export const signupService = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const loginService = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const logoutService = async () => {
  await axiosInstance.post("/auth/logout");
};

export const updateProfileService = async (data) => {
  const res = await axiosInstance.put("/auth/update-profile", data);
  return res.data;
};
