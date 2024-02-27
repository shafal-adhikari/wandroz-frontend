import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./post-actions";
interface IReactions {
  like: number;
  love: number;
  happy: number;
  wow: number;
  sad: number;
  angry: number;
}
interface Post {
  _id: string;
  userId: string;
  post: string;
  commentsCount: number;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  imageLinks: string[];
  videoLinks: string[];
  videoId?: string;
  videoVersion?: string;
  feelings?: string;
  privacy?: string;
  reactions?: IReactions;
  createdAt?: Date;
}
interface PostState {
  postsLoading?: boolean;
  posts?: Post[];
  error?: string | null;
}
const initialState: PostState = {
  postsLoading: false,
  posts: [],
  error: null,
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.postsLoading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.postsLoading = false;
        state.error = (action.payload as string) ?? "An error occurred";
      });
  },
});

export default postSlice.reducer;
