// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import ToggleSwitch from "../shared/ui/ToggleSwitch";
// import { updateNotificationSettings } from "../../store/user/user-actions";

// function Privacy() {
//   const { user } = useSelector((state: RootState) => state.user);
//   //   const [privacy, setPrivacy] = useState('Public');
//   //   useEffect(() => {
//   //     if (user) setSettings(user.notifications);
//   //   }, [user]);
//   const dispatch: AppDispatch = useDispatch();
//   const toggleSettings = (key: string, value: boolean) => {
//     setSettings((prevSettings) => {
//       return {
//         ...prevSettings,
//         [key]: value,
//       };
//     });
//     dispatch(
//       updateNotificationSettings({
//         ...settings,
//         [key]: value,
//       })
//     );
//   };
//   return (
//     <div className="flex flex-col gap-7">
//       <div className="flex flex-col">
//         <span className="text-2xl text-slate-700 font-semibold">
//           Account Privacy
//         </span>
//         <span className="text-md text-slate-600">
//           Change account privacy to Public / Private
//         </span>
//       </div>
//       <div className="flex flex-col gap-5 w-full">
//         <div className="flex justify-between items-center">
//           <span className="text-xl text-slate-700">Account Privacy</span>
//           <ToggleSwitch
//             enabled={settings.messages}
//             isForPrivacy={true}
//             toggleEnabled={() => toggleSettings("messages", !settings.messages)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Privacy;
