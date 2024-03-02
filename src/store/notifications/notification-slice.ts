import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "./notification-actions";
export interface INotification {
  userTo: string;
  userFrom: string;
  message: string;
  notificationType: string;
  entityId: string;
  createdItemId: string;
  createdAt: Date;
  comment: string;
  reaction: string;
  post: string;
}
interface NotificationState {
  notificationsLoading: boolean;
  notifications: INotification[];
}

const initialState: NotificationState = {
  notificationsLoading: false,
  notifications: [],
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state) => {
      state.notificationsLoading = true;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notificationsLoading = false;
      state.notifications = action.payload;
    });
  },
});

export default postSlice.reducer;
