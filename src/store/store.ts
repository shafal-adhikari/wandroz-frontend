// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import userReducer from "./user/user-slice";
import postReducer from "./post/post-slice";
import notificationReducer from "./notifications/notification-slice";
import chatReducer from "./chat/chat-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    chat: chatReducer,
    notification: notificationReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
