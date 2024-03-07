import { createSlice } from "@reduxjs/toolkit";
import {
  addMessage,
  getChatList,
  getMessages,
  readMessage,
} from "./chat-actions";
import { getFollowings } from "../user/user-actions";
import { Follow } from "../user/user-slice";

export interface ChatList {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  latestMessage?: string;
  isRead: boolean;
  latestMessageTime?: string;
}
export interface Message {
  _id?: string;
  receiverId: string;
  senderId?: string;
  body: string;
  isRead: boolean;
  createdAt?: Date | string;
}
interface ChatState {
  chatList: ChatList[];
  messages: Message[];
}

const initialState: ChatState = {
  chatList: [],
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
      const itemIndex = state.chatList.findIndex(
        (el) => el._id === action.payload.senderId
      );
      if (itemIndex > -1) {
        const item = state.chatList[itemIndex];
        item.latestMessage = action.payload.body;
        item.isRead = true;
        state.chatList.splice(itemIndex, 1);
        state.chatList.unshift(item);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatList.fulfilled, (state, action) => {
        state.chatList = action.payload;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.messages = [...state.messages, action.meta.arg];
        const itemIndex = state.chatList.findIndex(
          (el) => el._id === action.meta.arg.receiverId
        );
        if (itemIndex > -1) {
          const item = state.chatList[itemIndex];
          item.latestMessage = action.meta.arg.body;
          item.isRead = true;
          state.chatList.splice(itemIndex, 1);
          state.chatList.unshift(item);
        }
      })
      .addCase(readMessage.fulfilled, (state, action) => {
        const itemIndex = state.chatList.findIndex(
          (el) => el._id === action.payload
        );
        if (itemIndex !== -1) {
          state.chatList[itemIndex].isRead = true;
        }
      })
      .addCase(getFollowings.fulfilled, (state, action) => {
        const notConversationFollowers = (action.payload as Follow[]).filter(
          (follow) => {
            return !state.chatList.find((chat) => chat._id == follow._id);
          }
        );
        state.chatList = [
          ...state.chatList,
          ...(notConversationFollowers as ChatList[]),
        ];
      });
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
