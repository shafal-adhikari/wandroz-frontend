import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import ToggleSwitch from "../shared/ui/ToggleSwitch";
import { updateNotificationSettings } from "../../store/user/user-actions";

function Notifications() {
  const { user } = useSelector((state: RootState) => state.user);
  const [settings, setSettings] = useState({
    messages: true,
    reactions: true,
    comments: true,
    follows: true,
  });
  useEffect(() => {
    if (user) setSettings(user.notifications);
  }, [user]);
  const dispatch: AppDispatch = useDispatch();
  const toggleSettings = (key: string, value: boolean) => {
    setSettings((prevSettings) => {
      return {
        ...prevSettings,
        [key]: value,
      };
    });
    dispatch(
      updateNotificationSettings({
        ...settings,
        [key]: value,
      })
    );
  };
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col">
        <span className="text-2xl text-slate-700 font-semibold">
          Notification Settings
        </span>
        <span className="text-md text-slate-600">
          Enable or disable notifications
        </span>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex justify-between items-center">
          <span className="text-xl text-slate-700">Messages</span>
          <ToggleSwitch
            enabled={settings.messages}
            toggleEnabled={() => toggleSettings("messages", !settings.messages)}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl text-slate-700">Follows</span>
          <ToggleSwitch
            enabled={settings.follows}
            toggleEnabled={() => toggleSettings("follows", !settings.follows)}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl text-slate-700">Reactions</span>
          <ToggleSwitch
            enabled={settings.reactions}
            toggleEnabled={() =>
              toggleSettings("reactions", !settings.reactions)
            }
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl text-slate-700">Comments</span>
          <ToggleSwitch
            enabled={settings.comments}
            toggleEnabled={() => toggleSettings("comments", !settings.comments)}
          />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
