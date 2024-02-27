import { createSlice } from "@reduxjs/toolkit";
import {
  acceptFollowRequest,
  followUser,
  getFollowRequests,
  getProfile,
  getProfileById,
  getProfilePosts,
  searchUsers,
  uploadProfilePicture,
} from "./user-actions";
import { toast } from "react-toastify";
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  privacy: string;
  profilePicture: string;
  postsCount: number;
  followingCount: number;
  followersCount: number;
  bio: string;
  work: string;
  school: string;
  location: string;
  followingStatus?: FollowingStatus;
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
}
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
export enum FollowingStatus {
  FOLLOWING = "FOLLOWING",
  NOT_FOLLOWING = "NOT_FOLLOWING",
  PENDING = "PENDING",
}
interface UserState {
  loading: boolean;
  error: string | null;
  user: User | null;
  userPosts: Post[];
  searchUsers: User[];
  userProfile: User | null;
  searchLoading: boolean;
  profileLoading: boolean;
  followLoading: boolean;
  followRequestsLoading: boolean;
  profileUploadLoading: boolean;
  followRequests: FollowRequest[];
  acceptLoadings: string[];
}
enum Status {
  PENDING = "PENDING",
  FOLLOWING = "FOLLOWING",
  NOT_FOLLOWED = "NOT_FOLLOWED",
}
interface FollowRequest {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  status?: Status;
}
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  userPosts: [],
  searchUsers: [],
  followRequests: [],
  userProfile: null,
  profileLoading: false,
  searchLoading: false,
  followLoading: false,
  followRequestsLoading: false,
  profileUploadLoading: false,
  acceptLoadings: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder
      .addCase(getProfileById.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "An error occurred";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "An error occurred";
      })
      .addCase(getProfilePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfilePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload.posts;
      })
      .addCase(searchUsers.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchUsers = action.payload;
        state.searchLoading = false;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.error = (action.payload as string) ?? "An error occured";
        state.searchLoading = false;
      })
      .addCase(followUser.pending, (state) => {
        state.followLoading = true;
      })
      .addCase(followUser.fulfilled, (state) => {
        state.followLoading = false;
        if (state.userProfile)
          state.userProfile = {
            ...state.userProfile,
            followingStatus:
              state.userProfile.privacy == "PRIVATE"
                ? FollowingStatus.PENDING
                : FollowingStatus.FOLLOWING,
          };
      })
      .addCase(getFollowRequests.pending, (state) => {
        state.followRequestsLoading = true;
      })
      .addCase(getFollowRequests.fulfilled, (state, action) => {
        state.followRequestsLoading = false;
        state.followRequests = action.payload;
      })
      .addCase(getFollowRequests.rejected, (state) => {
        state.followRequestsLoading = false;
      })
      .addCase(acceptFollowRequest.pending, (state, { meta }) => {
        state.acceptLoadings = [...state.acceptLoadings, meta.arg.followerId];
      })
      .addCase(acceptFollowRequest.fulfilled, (state, { meta }) => {
        state.acceptLoadings = [...state.acceptLoadings].filter(
          (id) => id !== meta.arg.followerId
        );
        const followRequest = state.followRequests.find(
          (request) => request._id == meta.arg.followerId
        );
        if (followRequest) {
          const followIndex = state.followRequests.indexOf(followRequest);
          state.followRequests[followIndex].status =
            meta.arg.status == true ? Status.FOLLOWING : Status.NOT_FOLLOWED;
        }
      })
      .addCase(acceptFollowRequest.rejected, (state, { meta }) => {
        state.acceptLoadings = [...state.acceptLoadings].filter(
          (id) => id !== meta.arg.followerId
        );
      })
      .addCase(uploadProfilePicture.pending, (state) => {
        state.profileUploadLoading = true;
      })
      .addCase(uploadProfilePicture.fulfilled, (state) => {
        state.profileUploadLoading = false;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.profileUploadLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export default userSlice.reducer;
