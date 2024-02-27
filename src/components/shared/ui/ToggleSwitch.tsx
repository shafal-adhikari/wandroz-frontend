import { Icon } from "@iconify/react";
import { ReactEventHandler } from "react";

const ToggleSwitch = ({
  toggleDarkMode,
  darkMode,
}: {
  toggleDarkMode: ReactEventHandler<HTMLInputElement>;
  darkMode: boolean;
}) => {
  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="sr-only"
          />
          <div className="block h-8 w-14 rounded-full bg-primary dark:bg-primary"></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              darkMode ? "translate-x-full" : ""
            }`}
          >
            <span className={`${darkMode ? "text-black" : "hidden"}`}>
              <Icon icon="ph:moon-light" />
            </span>
            <span className={`${darkMode ? "hidden" : "text-black"}`}>
              <Icon icon="ph:sun-light" />
            </span>
          </div>
        </div>
      </label>
    </>
  );
};

export default ToggleSwitch;
