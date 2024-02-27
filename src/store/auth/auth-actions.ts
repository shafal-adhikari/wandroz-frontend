import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ResponseError, AuthData } from "../constants";
import axiosInstance from "../../config/axios.config";

export const signup = createAsyncThunk(
  "auth",
  async (credentials: AuthData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/signup", credentials);
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

export const login = createAsyncThunk(
  "auth",
  async (credentials: AuthData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", credentials);
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
