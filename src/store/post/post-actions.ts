import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ResponseError } from "../constants";
import axiosInstance from "../../config/axios.config";
import { CommentData } from "./post-slice";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (currentPage: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/post/all/${currentPage}`);
      return {
        posts: response.data.posts,
        postsCount: response.data.totalPosts,
      };
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
  "post/profilePosts",
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
interface ReactionData {
  postId: string;
  previousReaction: string;
  type: string;
}
export const reactToPost = createAsyncThunk(
  "post/react",
  async (data: ReactionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/post/reaction`, data);
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

export const addComment = createAsyncThunk(
  "post/comment",
  async (data: CommentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/post/comment`, data);
      return response.data.comment;
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
interface RemoveReactionData {
  postId: string;
  previousReaction: string;
}
export const removeReaction = createAsyncThunk(
  "post/remove-react",
  async (data: RemoveReactionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/post/reaction/remove`, data);
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
interface PostData {
  id?: string;
  post?: string;
  privacy: string;
  images?: string[];
  prevImages?: string[];
}
export const uploadPost = createAsyncThunk(
  "post/upload",
  async (data: PostData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/post`, data);
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
export const editPost = createAsyncThunk(
  "post/upload",
  async (data: PostData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/post/${data.id}`, data);
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

export const deletePost = createAsyncThunk(
  "post/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/post/${id}`);
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
export const getComments = createAsyncThunk(
  "post/comments",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/post/comments/${id}`);
      return response.data.comments as CommentData[];
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
export const getPostById = createAsyncThunk(
  "post/getbyid",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/post/${id}`);
      return response.data.post;
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
