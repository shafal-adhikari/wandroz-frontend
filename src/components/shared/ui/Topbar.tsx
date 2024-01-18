import { Icon } from "@iconify/react";
import Input from "./Input";

function Topbar() {
  return (
    <div className="w-screen bg-white h-[5rem] px-2 md:px-10">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
          <span className="text-2xl text-slate-600 font-bold">Wandroz</span>
          <div className="flex items-center gap-2">
            <Input
              className="w-[20rem] px-3 py-0 h-12 rounded-full"
              type="text"
              icon={
                <Icon icon="bx:bx-search" className="text-xl text-slate-600" />
              }
              inputClassName="text-md text-slate-600"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center rounded-full text-primary w-12 h-12 bg-gray-200 hover:bg-primary hover:text-white cursor-pointer transition-all duration-200 ease-in-out relative">
            <Icon icon="carbon:notification-filled" className="text-2xl" />
            <div className="absolute -top-1 right-1 bg-red-500 w-4 h-4 rounded-full"></div>
          </div>
          <div className="flex items-center justify-center rounded-full text-primary w-12 h-12 bg-gray-200 hover:bg-primary hover:text-white cursor-pointer transition-all duration-200 ease-in-out relative">
            <Icon icon="bi:chat-fill" className="text-xl" />
            {/* <div className="absolute -top-1 right-1 bg-red-500 w-4 h-4 rounded-full"></div> */}
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
