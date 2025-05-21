import { axiosInstance } from "../lib/axios";

export const getUsersService = async () => {
  const res = await axiosInstance.get("/messages/users");
  return res.data;
};

export const getMessagesService = async (userId) => {
  if (!userId) return [];
  const res = await axiosInstance.get(`/messages/${userId}`);
  return res.data;
};

export const sendMessageService = async (recipientId, messageData) => {
  const res = await axiosInstance.post(`/messages/send/${recipientId}`, messageData);
  return res.data;
};
