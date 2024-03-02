import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios.config";
import { AxiosError } from "axios";
import { ResponseError } from "../constants";
import { NotificationSettings, SocialLinks, User } from "./user-slice";

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
export const getSuggestedUsers = createAsyncThunk(
  "user/suggestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/user-suggestions`);
      return response.data.users;
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
export const updateBasicInfos = createAsyncThunk(
  "user/update",
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.put(`/user/profile/basic-info`, data);
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
export const updateSocialLinks = createAsyncThunk(
  "user/update",
  async (data: SocialLinks, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.put(
        `/user/profile/social-links`,
        data
      );
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
export const updateNotificationSettings = createAsyncThunk(
  "user/notification-settings",
  async (data: NotificationSettings, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.put(`/user/profile/settings`, data);
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
export const getFollowers = createAsyncThunk(
  "user/followers",
  async (userId: string, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.get(`/user/followers/${userId}`);
      return result.data.followers;
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
export const getFollowings = createAsyncThunk(
  "user/followings",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.get(`/user/following`);
      return result.data.following;
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
