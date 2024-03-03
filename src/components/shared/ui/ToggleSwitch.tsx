import { Icon } from "@iconify/react";

const ToggleSwitch = ({
  toggleEnabled,
  enabled,
  isForDark,
}: {
  toggleEnabled: () => void;
  enabled: boolean;
  isForDark?: boolean;
}) => {
  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={enabled}
            onChange={toggleEnabled}
            className="sr-only"
          />
          <div
            className={`block h-8 w-14 rounded-full  ${
              !isForDark
                ? enabled
                  ? "bg-green-600"
                  : "bg-red-600"
                : "bg-primary"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              enabled ? "translate-x-full" : ""
            }`}
          >
            <span className={`${enabled ? "text-black" : "hidden"}`}>
              {isForDark && <Icon icon="ph:moon-light" />}
            </span>
            <span className={`${enabled ? "hidden" : "text-black"}`}>
              {isForDark && <Icon icon="ph:sun-light" />}
            </span>
          </div>
        </div>
      </label>
    </>
  );
};

export default ToggleSwitch;
