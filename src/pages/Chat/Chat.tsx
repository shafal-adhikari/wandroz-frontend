import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChatList } from "../../store/chat/chat-actions";
import { AppDispatch, RootState } from "../../store/store";
import { ChatList } from "../../store/chat/chat-slice";
import Message from "../../components/Chat/Message";
import { getFollowings } from "../../store/user/user-actions";

dayjs.extend(utc);
dayjs.extend(timezone);

function Chat() {
  const [selectedChat, setSelectedChat] = useState<ChatList>();
  const [isMobile, setIsMobile] = useState(
    window.innerWidth > 768 ? false : true
  );
  const { chatList } = useSelector((state: RootState) => state.chat);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getChatList())
      .unwrap()
      .then(() => {
        dispatch(getFollowings());
      });
  }, [dispatch]);

  useEffect(() => {
    if (!selectedChat?._id && chatList.length > 0 && !isMobile) {
      setSelectedChat(chatList[0]);
    }
  }, [chatList, selectedChat, isMobile]);
  const selectChatHandler = (chat: ChatList) => {
    setSelectedChat(chat);
  };
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  return (
    <div className="flex w-full md:p-5 p-0 h-[90vh]">
      <div
        className={`flex flex-col gap-5  p-5 bg-[#f4f5f9] dark:bg-dark-800 dark:text-dark-400 rounded-2xl  mx-auto ${
          isMobile && selectedChat?._id
            ? "hidden"
            : "min-w-full md:min-w-[350px]"
        }`}
      >
        <div className="chat-header h-fit w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon
              icon="ph:arrow-left-bold"
              className="text-2xl md:hidden"
              onClick={() => navigate("/")}
            />
            <h1 className="text-2xl font-medium">Chats</h1>
          </div>
          <Icon
            icon="majesticons:search-line"
            className="text-2xl text-slate-400 hidden"
          />
        </div>
        <div className="users snap-y flex flex-col gap-4 overflow-y-scroll overscroll-contain md:h-[80svh] h-[100svh]">
          {chatList.map((chat, index) => {
            const localTime = chat.latestMessageTime
              ? dayjs.utc(chat.latestMessageTime).local()
              : undefined;
            const formattedTime = localTime ? localTime.format("hh:mm A") : "";
            return (
              <div
                key={chat._id + index}
                onClick={() => selectChatHandler(chat)}
                className={`${
                  selectedChat?._id == chat._id
                    ? "bg-primary shadow-xl text-white"
                    : "hover:bg-primary hover:shadow-xl group"
                } card snap-start flex gap-4 rounded-xl p-2  items-center transition-all`}
              >
                <img
                  src={
                    chat.profilePicture.length
                      ? chat.profilePicture
                      : "/default-avatar.webp"
                  }
                  className="w-[50px] h-[40px] rounded-full"
                />
                <div
                  className={`${
                    selectedChat?._id == chat._id
                      ? "text-white "
                      : "group-hover:text-white"
                  } info w-full`}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={`${
                        selectedChat?._id == chat._id
                          ? "text-white"
                          : "text-slate-600 group-hover:text-white"
                      } font-bold`}
                    >
                      {chat.firstName} {chat.lastName}
                    </h3>
                    <div className=" text-xs">{formattedTime}</div>
                  </div>

                  <p>
                    {(chat.latestMessage?.length ?? 0) > 20
                      ? chat.latestMessage?.substring(0, 20) + " .."
                      : chat.latestMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Message
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        isHidden={isMobile && !selectedChat?._id}
      />
    </div>
  );
}

export default Chat;
