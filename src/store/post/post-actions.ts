import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ResponseError } from "../constants";
import axiosInstance from "../../config/axios.config";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (currentPage: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/post/all/${currentPage}`);
      return response.data.posts;
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
