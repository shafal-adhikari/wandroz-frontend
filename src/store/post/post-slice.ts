import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  getPosts,
  getProfilePosts,
  reactToPost,
  removeReaction,
} from "./post-actions";
export interface IReactions {
  like: number;
  love: number;
  happy: number;
  wow: number;
  sad: number;
  angry: number;
}
export interface CommentData {
  postId?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  comment: string;
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
  reactions: IReactions;
  reactionCount?: number;
  userReaction?: string;
  createdAt?: Date;
}
interface PostState {
  postsLoading: boolean;
  posts: Post[];
  userPosts: Post[];
  error?: string | null;
  userPostsLoading: boolean;
  postsCount: number;
  comments: CommentData[];
}
const initialState: PostState = {
  postsLoading: false,
  posts: [],
  postsCount: 0,
  error: null,
  userPostsLoading: false,
  userPosts: [],
  comments: [],
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.postsLoading = action.meta.arg == 1 ? true : false;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.postsCount = action.payload.postsCount;
        if (action.meta.arg == 1) {
          state.posts = action.payload.posts;
        } else {
          state.posts = [...state.posts, ...action.payload.posts];
        }
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.postsLoading = false;
        state.error = (action.payload as string) ?? "An error occurred";
      })
      .addCase(getProfilePosts.pending, (state) => {
        state.userPostsLoading = true;
        state.error = null;
      })
      .addCase(getProfilePosts.fulfilled, (state, action) => {
        state.userPostsLoading = false;
        state.userPosts = action.payload.posts;
      })
      .addCase(reactToPost.fulfilled, (state, action) => {
        const data = action.meta.arg;
        const newPostsData = [...state.posts].map((post) => {
          if (post._id == data.postId) {
            return {
              ...post,
              userReaction: data.type,
              reactionCount:
                post.reactionCount! +
                (data.previousReaction.length > 1 ? 0 : 1),
              reactions: {
                ...post.reactions,
                [data.type]:
                  post.reactions[data.type as keyof typeof post.reactions] + 1,
                [data.previousReaction]: data.previousReaction.length
                  ? post.reactions[
                      data.previousReaction as keyof typeof post.reactions
                    ] - 1
                  : 0,
              },
            };
          }
          return post;
        });
        const newUserPosts = [...state.userPosts].map((post) => {
          if (post._id == data.postId) {
            return {
              ...post,
              userReaction: data.type,
              reactionCount:
                post.reactionCount! +
                (data.previousReaction.length > 1 ? 0 : 1),
              reactions: {
                ...post.reactions,
                [data.type]:
                  post.reactions[data.type as keyof typeof post.reactions] + 1,
                [data.previousReaction]: data.previousReaction.length
                  ? post.reactions[
                      data.previousReaction as keyof typeof post.reactions
                    ] - 1
                  : 0,
              },
            };
          }
          return post;
        });
        state.userPosts = newUserPosts;
        state.posts = newPostsData;
      })
      .addCase(removeReaction.fulfilled, (state, action) => {
        const data = action.meta.arg;
        const newPostsData = [...state.posts].map((post) => {
          if (post._id == data.postId) {
            return {
              ...post,
              userReaction: "",
              reactionCount: post.reactionCount! - 1,
              reactions: {
                ...post.reactions,
                [data.previousReaction]:
                  post.reactions[
                    data.previousReaction as keyof typeof post.reactions
                  ] - 1,
              },
            };
          }
          return post;
        });
        const newUserPosts = [...state.userPosts].map((post) => {
          if (post._id == data.postId) {
            return {
              ...post,
              userReaction: "",
              reactionCount: post.reactionCount! - 1,
              reactions: {
                ...post.reactions,
                [data.previousReaction]:
                  post.reactions[
                    data.previousReaction as keyof typeof post.reactions
                  ] - 1,
              },
            };
          }
          return post;
        });
        state.userPosts = newUserPosts;
        state.posts = newPostsData;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const newUserPosts = [...state.userPosts].map((post) => {
          if (post._id == action.meta.arg.postId) {
            return {
              ...post,
              commentsCount: post.commentsCount + 1,
            };
          }
          return post;
        });

        const posts = [...state.posts].map((post) => {
          if (post._id == action.meta.arg.postId) {
            return {
              ...post,
              commentsCount: post.commentsCount + 1,
            };
          }
          return post;
        });
        state.userPosts = newUserPosts;
        state.posts = posts;
      });
  },
});

export default postSlice.reducer;
