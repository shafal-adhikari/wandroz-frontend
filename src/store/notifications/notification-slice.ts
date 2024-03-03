import { createSlice } from "@reduxjs/toolkit";
import { getNotifications, updateNotifications } from "./notification-actions";
export interface INotification {
  _id: string;
  userTo: string;
  userFrom: string;
  message: string;
  notificationType: string;
  entityId: string;
  createdItemId: string;
  createdAt: Date;
  read: boolean;
  comment: string;
  reaction: string;
  post: string;
}
interface NotificationState {
  notificationsLoading: boolean;
  notifications: INotification[];
  unReadCount: number;
}

const initialState: NotificationState = {
  notificationsLoading: false,
  notifications: [],
  unReadCount: 0,
};
const notificationSlice = createSlice({
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
      state.unReadCount = state.notifications.filter((notification) => {
        return !notification.read;
      }).length;
    });
    builder.addCase(updateNotifications.fulfilled, (state) => {
      state.unReadCount = 0;
      state.notifications = state.notifications.map((notification) => {
        return {
          ...notification,
          read: true,
        };
      });
    });
  },
});

export default notificationSlice.reducer;
