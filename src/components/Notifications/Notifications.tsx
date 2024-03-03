import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
} from "../shared/Dropdown/Dropdown";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getNotifications,
  updateNotifications,
} from "../../store/notifications/notification-actions";

function Notifications() {
  const dispatch: AppDispatch = useDispatch();
  const { notificationsLoading, notifications, unReadCount } = useSelector(
    (state: RootState) => state.notification
  );
  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);
  const markAsSeenHandler = () => {
    dispatch(updateNotifications(notifications[0]._id));
  };
  return (
    <Dropdown>
      <DropdownButton className="flex items-center justify-center rounded-full text-primary w-12 h-12 bg-gray-200 hover:bg-primary hover:text-white cursor-pointer transition-all duration-200 ease-in-out relative">
        <Icon icon="carbon:notification-filled" className="text-2xl" />
        {unReadCount > 0 && (
          <div className="absolute -top-1 right-1 bg-red-500 w-4 h-4 rounded-full"></div>
        )}
      </DropdownButton>
      <DropdownContent className="absolute top-[5rem] right-5 mr-10 min-w-[30rem] h-auto rounded-md bg-white flex flex-col gap-3 py-3 px-3 shadow-md">
        <div className="flex px-3 gap-2 items-center">
          <div className="text-xl text-slate-900 font-[500]">Notifications</div>
          <div className=" flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white">
            {unReadCount}
          </div>
          {unReadCount > 0 && (
            <div
              onClick={markAsSeenHandler}
              className="text-sm underline text-primary font-semibold cursor-pointer"
            >
              Mark as read
            </div>
          )}
        </div>

        {notificationsLoading && (
          <div className="flex items-center w-full">
            <Icon icon="gg:spinner" className="animate:spin" />
          </div>
        )}
        {notifications?.length ? (
          notifications.map((notification, i) => {
            return (
              <div
                key={i}
                className={`flex ${
                  !notification.read && "font-bold"
                } gap-3 px-3 py-3 rounded-md cursor-pointer hover:bg-slate-100 items-center`}
              >
                {notification.notificationType == "reactions" && (
                  <img
                    src={`/reactions/${notification.reaction}.png`}
                    className="w-8 h-8"
                  />
                )}
                {notification.notificationType == "comment" && (
                  <Icon
                    className="text-green-500 text-4xl"
                    icon="heroicons:chat-bubble-bottom-center-solid"
                  />
                )}
                {notification.message}
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center text-slate-600 text-md">
            No Notifications Found
          </div>
        )}
      </DropdownContent>
    </Dropdown>
  );
}

export default Notifications;
