import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ToggleSwitch from "../shared/ui/ToggleSwitch";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
} from "../shared/Dropdown/Dropdown";
import { Link } from "react-router-dom";

function ProfileMenu() {
  const { user } = useSelector((state: RootState) => state.user);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <Dropdown>
      <DropdownButton className="w-12 h-12 rounded-full overflow-hidden relative">
        <img
          src={
            user?.profilePicture.length
              ? user?.profilePicture
              : "/default-avatar.webp"
          }
          alt="profile"
          className="w-full h-full object-cover cursor-pointer"
        />
      </DropdownButton>
      <DropdownContent className="absolute top-[5rem] right-0 mr-10 w-[20rem] h-auto rounded-md bg-white flex flex-col gap-1 py-2 shadow-lg">
        <div className="flex items-center justify-between gap-2 w-full h-auto px-3 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={
                  user?.profilePicture.length
                    ? user?.profilePicture
                    : "/default-avatar.webp"
                }
                alt="profile"
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-md text-slate-600 font-bold">
                {`${user?.firstName} ${user?.lastName} `}
              </span>
              <span className="text-sm text-slate-500 ">{user?.email}</span>
            </div>
          </div>
        </div>
        <Link
          to="/profile"
          className="flex gap-4 w-full px-3 h-[3rem] items-center text-md text-slate-600 mt-2 cursor-pointer hover:bg-gray-100"
        >
          <Icon
            icon="iconamoon:profile-circle-fill"
            className="text-2xl text-slate-600"
          />
          Profile
        </Link>
        <div className="flex gap-4 w-full px-3 h-[3rem] items-center text-md text-slate-600 cursor-pointer hover:bg-gray-100">
          <Icon
            icon="solar:settings-bold"
            className="text-2xl text-slate-600"
          />
          Settings
        </div>
        <div className="flex gap-4 w-full px-3 h-[3rem] items-center justify-between cursor-pointer hover:bg-gray-100">
          <div className="flex gap-4 h-full items-center text-md text-slate-600">
            <Icon
              icon="streamline:dark-dislay-mode-solid"
              className="text-2xl text-slate-600"
            />
            Dark Mode
          </div>
          <ToggleSwitch toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        </div>
        <div className="flex gap-2  px-3 py-2 rounded-full bg-red-500 text-white items-center justify-center mx-3 mt-2 cursor-pointer">
          <Icon icon="majesticons:logout" className="text-xl font-bold" />
          Logout
        </div>
      </DropdownContent>
    </Dropdown>
  );
}

export default ProfileMenu;
