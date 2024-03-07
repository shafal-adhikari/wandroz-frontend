import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ChatList, Message, chatActions } from "../../store/chat/chat-slice";
import { AppDispatch, RootState } from "../../store/store";
import { socket } from "../../socket";
import { addMessage, getMessages } from "../../store/chat/chat-actions";
dayjs.extend(utc);
dayjs.extend(timezone);
function Message({
  selectedChat,
  isHidden,
  setSelectedChat,
}: {
  selectedChat?: ChatList;
  isHidden: boolean;
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatList | undefined>>;
}) {
  const dispatch: AppDispatch = useDispatch();
  const { messages } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.user);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [typingState, setTypingState] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);
  useEffect(() => {
    if (typingState)
      socket.emit("typing", {
        sender: user?._id,
        receiver: selectedChat?._id,
        typing: typingState,
      });
  }, [typingState, selectedChat?._id, user?._id]);
  useEffect(() => {
    if (selectedChat?._id) {
      dispatch(getMessages(selectedChat._id));
    }
  }, [selectedChat, dispatch]);
  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 0) {
      if (!typingState) setTypingState(true);
    } else {
      socket.emit("typing", {
        sender: user?._id,
        receiver: selectedChat?._id,
        typing: false,
      });
    }
  };
  const scrollToBottom = () => {
    if (containerRef.current)
      containerRef.current.scrollTop =
        containerRef?.current?.scrollHeight + 100;
  };
  const [isReceiverTyping, setIsReceiverTyping] = useState(false);
  useEffect(() => {
    socket.on("message", (data: Message) => {
      if (data.senderId !== selectedChat?._id) {
        return;
      } else {
        dispatch(chatActions.addMessage(data));
        // scrollToBottom();
      }
    });
    socket.on("typing", (data) => {
      if (data.receiverId == user?._id) {
        if (data.typing) {
          setIsReceiverTyping(true);
          scrollToBottom();
        } else {
          setIsReceiverTyping(false);
        }
      }
    });
  }, [selectedChat, dispatch, user?._id]);
  const sendMessageHandler = async () => {
    if (!selectedChat?._id && inputRef.current?.value) {
      return;
    }
    dispatch(
      addMessage({
        receiverId: selectedChat!._id!,
        senderId: user?._id,
        body: inputRef.current!.value!,
        isRead: false,
      })
    );
    // scrollToBottom();

    if (inputRef.current) inputRef.current.value = "";
  };
  const goBackHandler = () => {
    setSelectedChat(undefined);
  };
  return (
    <div
      className={`flex-col md:px-10 px-4 w-full ${
        isHidden ? "hidden" : "md:flex"
      }`}
    >
      {selectedChat ? (
        <>
          <div className="flex md:py-5 py-1 border-b border-primary sticky top-0">
            <div className="card snap-start flex gap-4 rounded-xl p-2 items-center ">
              <Icon
                onClick={goBackHandler}
                icon="ph:arrow-left-bold"
                className="text-2xl md:hidden"
              />
              <img
                src={
                  selectedChat?.profilePicture.length
                    ? selectedChat.profilePicture
                    : "default-avatar.webp"
                }
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="info flex items-center">
                <h3 className="text-slate-600 font-bold text-xl">
                  {selectedChat?.firstName} {selectedChat?.lastName}
                </h3>
              </div>
            </div>
          </div>
          <div
            ref={containerRef}
            className="chats h-[65svh] snap-y flex flex-col mt-10 mb-10 gap-4 overflow-y-scroll overscroll-contain"
          >
            {messages.length < 1 && (
              <span className="self-center opacity-50 dark:text-dark-400">
                Start Conversation with {selectedChat?.firstName}{" "}
                {selectedChat?.lastName}
              </span>
            )}
            {messages.map((message, index) => {
              const localTime = dayjs.utc(message.createdAt).local();
              const formattedTime = localTime.format("hh:mm A");
              return (
                <div
                  key={index}
                  className={`message snap-end max-w-md w-fit px-4 py-2 ${
                    message.senderId !== user?._id
                      ? "self-start bg-[#f4f5f9] dark:bg-dark-700 dark:text-dark-300"
                      : "self-end bg-primary text-white"
                  }  rounded-xl`}
                >
                  {message?.body !== "" && <p>{message?.body}</p>}
                  <span
                    className={`text-xs mt-2 ${
                      message.senderId !== user?._id
                        ? "float-left"
                        : "float-right"
                    } flex gap-1 items-center`}
                  >
                    <Icon icon="mdi:tick-all" className="inline-flex" />
                    {formattedTime}
                  </span>
                </div>
              );
            })}
            {isReceiverTyping && (
              <div className="flex items-center justify-center w-fit gap-1 px-3 py-2 snap-end">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              </div>
            )}
          </div>
          <div className="chat-footer pt-4 flex flex-col gap-2">
            <textarea
              ref={inputRef}
              onChange={inputChangeHandler}
              className="w-full border-2 border-primary rounded-xl resize-none p-2 caret-pink-500 bg-transparent dark:text-dark-400"
            ></textarea>
            <div className="flex items-center justify-between">
              <button
                className="bg-primary text-white flex items-center justify-center rounded-md font-bold py-2 px-4 gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  sendMessageHandler();
                }}
              >
                Send message{" "}
                <Icon icon="ic:round-send" className="inline-flex" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <span className="opacity-50 dark:text-dark-400 flex w-full h-full items-center justify-center">
          Select a chat to start Conversation
        </span>
      )}
    </div>
  );
}

export default Message;
