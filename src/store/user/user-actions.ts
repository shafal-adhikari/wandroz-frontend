import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";
import { AxiosError } from "axios";
import { ResponseError } from "../constants";

export const getProfile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/profile");
      return response.data.user;
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

export const getProfileById = createAsyncThunk(
  "user/profileById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/profile/${id}`);
      return response.data.user;
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

export const getProfilePosts = createAsyncThunk(
  "user/profilePosts",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/posts/${userId}`);
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
export const searchUsers = createAsyncThunk(
  "user/search",
  async (searchText: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/search/${searchText}`);
      return response.data.search;
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
export const followUser = createAsyncThunk(
  "user/follow",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/user/follow/${userId}`);
      return response.data.search;
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
export const getFollowRequests = createAsyncThunk(
  "user/follow-requests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/follow-requests`);
      return response.data.followRequests;
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
interface AcceptRequest {
  followerId: string;
  status: boolean;
}
interface ImageUploadData {
  image: string;
}
export const uploadProfilePicture = createAsyncThunk(
  "user/upload",
  async (data: ImageUploadData, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.post(`/images/profile`, data);
      return result.data;
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
export const acceptFollowRequest = createAsyncThunk(
  "user/accept",
  async (data: AcceptRequest, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/user/follow-requests/accept`, data);
      return data;
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
