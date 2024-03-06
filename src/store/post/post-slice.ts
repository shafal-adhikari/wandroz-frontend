import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  deletePost,
  getComments,
  getPostById,
  getPosts,
  getProfilePosts,
  reactToPost,
  removeReaction,
  uploadPost,
} from "./post-actions";
import { toast } from "react-toastify";
export interface IReactions {
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
  profilePicture: string;
  firstName: string;
  lastName: string;
  imageLinks: string[];
  videoLinks: string[];
  videoId?: string;
  videoVersion?: string;
  feelings?: string;
  privacy: string;
  reactions: IReactions;
  reactionCount: number;
  comments: CommentData[];
  userReaction: string;
  createdAt: Date;
}
export interface CommentData {
  _id?: string;
  postId: string;
  comment: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  createdAt?: Date;
  userId?: string;
}
interface PostState {
  postsLoading: boolean;
  posts: Post[];
  userPosts: Post[];
  error?: string | null;
  userPostsLoading: boolean;
  postsCount: number;
  uploadLoading: boolean;
  post: Post | null;
  commentsLoading: boolean;
}

const initialState: PostState = {
  postsLoading: false,
  posts: [],
  postsCount: 0,
  error: null,
  userPostsLoading: false,
  userPosts: [],
  uploadLoading: false,
  post: null,
  commentsLoading: false,
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
        if (state.post) {
          state.post = {
            ...state.post,
            userReaction: data.type,
            reactionCount:
              state.post.reactionCount! +
              (data.previousReaction.length > 1 ? 0 : 1),
            reactions: {
              ...state.post.reactions,
              [data.type]:
                state.post.reactions[
                  data.type as keyof typeof state.post.reactions
                ] + 1,
              [data.previousReaction]: data.previousReaction.length
                ? state.post.reactions[
                    data.previousReaction as keyof typeof state.post.reactions
                  ] - 1
                : 0,
            },
          };
        }
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
        if (state.post)
          state.post = {
            ...state.post,
            userReaction: "",
            reactionCount: state.post.reactionCount! - 1,
            reactions: {
              ...state.post.reactions,
              [data.previousReaction]:
                state.post.reactions[
                  data.previousReaction as keyof typeof state.post.reactions
                ] - 1,
            },
          };
        state.userPosts = newUserPosts;
        state.posts = newPostsData;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const newUserPosts = [...state.userPosts].map((post) => {
          if (post._id == action.meta.arg.postId) {
            return {
              ...post,
              commentsCount: post.commentsCount + 1,
              comments: [
                { ...action.meta.arg, ...action.payload },
                ...(post.comments ?? []),
              ],
            };
          }
          return post;
        });
        const posts = [...state.posts].map((post) => {
          console.log([{ ...action.meta.arg, ...action.payload }]);
          if (post._id == action.meta.arg.postId) {
            return {
              ...post,
              commentsCount: post.commentsCount + 1,
              comments: [
                { ...action.meta.arg, ...action.payload },
                ...(post.comments ?? []),
              ],
            };
          }
          return post;
        });

        if (state.post) {
          state.post = {
            ...state.post,
            comments: [
              { ...action.meta.arg, ...action.payload },
              ...state.post.comments,
            ],
          };
        }
        console.log("ok3");

        state.userPosts = newUserPosts;
        state.posts = posts;
      })
      .addCase(uploadPost.pending, (state) => {
        state.uploadLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => {
          return post._id !== action.meta.arg;
        });
        state.userPosts = state.posts.filter((post) => {
          return post._id !== action.meta.arg;
        });
        toast.success("Post deleted successfully");
      })
      .addCase(uploadPost.fulfilled, (state) => {
        state.uploadLoading = false;
        toast.success("Post uploaded");
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(getComments.pending, (state) => {
        state.commentsLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.commentsLoading = true;
        if (state.post) {
          state.post = {
            ...state.post,
            comments: action.payload,
          };
        }
      });
  },
});

export default postSlice.reducer;
