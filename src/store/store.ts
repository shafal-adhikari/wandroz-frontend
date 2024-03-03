// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import userReducer from "./user/user-slice";
import postReducer from "./post/post-slice";
import notificationReducer from "./notifications/notification-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    notification: notificationReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
