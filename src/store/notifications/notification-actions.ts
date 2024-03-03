import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";
import { AxiosError } from "axios";
import { ResponseError } from "../constants";

export const getNotifications = createAsyncThunk(
  "notifications/get",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.get(`/notifications`);
      return result.data.notifications;
    } catch (error) {
      const err = error as AxiosError<ResponseError>;
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue("An error occured");
      }
    }
  }
);

export const updateNotifications = createAsyncThunk(
  "notifications/update",
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.put(`/notification/${notificationId}`);
      return result.data.notifications;
    } catch (error) {
      const err = error as AxiosError<ResponseError>;
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue("An error occured");
      }
    }
  }
);
