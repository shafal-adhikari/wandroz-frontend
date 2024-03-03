import { ReactNode, useState } from "react";
import ChangePassword from "../../components/Settings/ChangePassword";
import Notifications from "../../components/Settings/Notifications";
// import Privacy from "../../components/Settings/Privacy";
interface Tab {
  value: string;
  element: ReactNode;
}
function Settings() {
  const tabs = [
    {
      value: "Notification Settings",
      element: <Notifications />,
    },
    {
      value: "Change Password",
      element: <ChangePassword />,
    },
    // {
    //   value: "Account Privacy",
    //   element: <Privacy />,
    // },
  ];
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  return (
    <div className="w-[70vw] flex mx-auto gap-5 bg-white h-auto p-4 rounded-2xl my-5 shadow-xl">
      <div className="flex flex-col w-[20vw] border-r p-2 gap-2">
        {tabs.map((tab, i) => {
          return (
            <div
              className={`px-3 w-full py-2 flex items-center justify-start text-semibold text-lg cursor-pointer rounded-md ${
                activeTab.value == tab.value
                  ? "bg-primary text-white"
                  : "bg-white text-slate-800"
              }`}
              key={i}
              onClick={() => setActiveTab(tab)}
            >
              {tab.value}
            </div>
          );
        })}
      </div>
      <div className="grow px-2 py-1">{activeTab.element}</div>
    </div>
  );
}

export default Settings;
