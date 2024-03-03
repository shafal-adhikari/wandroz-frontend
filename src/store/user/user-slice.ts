import { createSlice } from "@reduxjs/toolkit";
import {
  acceptFollowRequest,
  changePassword,
  followUser,
  getFollowRequests,
  getFollowers,
  getFollowings,
  getProfile,
  getProfileById,
  getSuggestedUsers,
  resetPassword,
  searchUsers,
  updateBasicInfos,
  uploadProfilePicture,
} from "./user-actions";
import { toast } from "react-toastify";
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  quote: string;
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
  social: SocialLinks;
  notifications: NotificationSettings;
}

export enum FollowingStatus {
  FOLLOWING = "FOLLOWING",
  NOT_FOLLOWING = "NOT_FOLLOWING",
  PENDING = "PENDING",
}
export interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
}
export interface NotificationSettings {
  messages: boolean;
  follows: boolean;
  reactions: boolean;
  comments: boolean;
}
interface UserState {
  loading: boolean;
  error: string | null;
  user: User | null;
  searchUsers: User[];
  userProfile: User | null;
  searchLoading: boolean;
  profileLoading: boolean;
  followLoading: boolean;
  followRequestsLoading: boolean;
  profileUploadLoading: boolean;
  followRequests: Follow[];
  followings: Follow[];
  followers: Follow[];
  followersLoading: boolean;
  acceptLoadings: string[];
  suggestedUsers: User[];
  updateLoading: boolean;
  suggestedLoading: boolean;
  changePasswordLoading: boolean;
  forgotPasswordLoading: boolean;
}
enum Status {
  PENDING = "PENDING",
  FOLLOWING = "FOLLOWING",
  NOT_FOLLOWED = "NOT_FOLLOWED",
}
export interface Follow {
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
  searchUsers: [],
  followRequests: [],
  userProfile: null,
  profileLoading: false,
  searchLoading: false,
  followLoading: false,
  followRequestsLoading: false,
  profileUploadLoading: false,
  suggestedUsers: [],
  followers: [],
  followings: [],
  acceptLoadings: [],
  followersLoading: false,
  updateLoading: false,
  suggestedLoading: false,
  changePasswordLoading: false,
  forgotPasswordLoading: false,
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
      })
      .addCase(updateBasicInfos.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateBasicInfos.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateBasicInfos.rejected, (state, action) => {
        state.updateLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(getFollowers.pending, (state) => {
        state.followersLoading = true;
      })
      .addCase(getFollowings.pending, (state) => {
        state.followersLoading = true;
      })
      .addCase(getFollowings.fulfilled, (state, action) => {
        state.followersLoading = false;
        state.followings = action.payload;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followersLoading = false;
        state.followers = action.payload;
      })
      .addCase(getSuggestedUsers.pending, (state) => {
        state.suggestedLoading = true;
      })
      .addCase(getSuggestedUsers.fulfilled, (state, action) => {
        state.suggestedLoading = false;
        state.suggestedUsers = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.changePasswordLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePasswordLoading = false;
        toast.success("Password changed successfully");
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(resetPassword.pending, (state) => {
        state.changePasswordLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.changePasswordLoading = false;
        toast.success("Reset link has been sent to your email");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.changePasswordLoading = false;
        toast.error(action.payload as string);
      });
  },
});

export default userSlice.reducer;
