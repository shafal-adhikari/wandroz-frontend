import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";
import { AxiosError } from "axios";
import { ResponseError } from "../constants";
import { Message } from "./chat-slice";

export const getChatList = createAsyncThunk(
  "chat/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/chat/list");
      return response.data.chatList;
    } catch (error) {
      const err = error as AxiosError<ResponseError>;
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);
export const getMessages = createAsyncThunk(
  "chat/messages",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chat/messages/${userId}`);
      return response.data.messages;
    } catch (error) {
      const err = error as AxiosError<ResponseError>;
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);
export const addMessage = createAsyncThunk(
  "chat/add-message",
  async (message: Message, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/chat/add`, message);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ResponseError>;
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export const readMessage = createAsyncThunk(
  "chat/read-message",
  async (senderId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/chat/messages`, { senderId });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ResponseError>;
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);
