import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { getProfile } from "../../../store/user/user-actions";
import CreatePost from "../../Post/CreatePost";
import Search from "../../Search/Search";
import ProfileMenu from "../../ProfileMenu/ProfileMenu";
import FollowRequests from "../../FollowRequests/FollowRequests";
import Notifications from "../../Notifications/Notifications";
import { Link } from "react-router-dom";

function Topbar() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  return (
    <>
      <div className="w-screen bg-white h-[5rem] px-2 md:px-10 flex items-center justify-between shadow-md z-10 sticky top-0">
        {/* <span className="text-3xl text-slate-600 font-bold">Wandrozz</span> */}
        <Link to="/">
          <img src="/logo.png" className="h-[5rem]" />
        </Link>
        <Search />
        <div className="flex items-center gap-5 ">
          <div
            onClick={() => setIsPostModalOpen(true)}
            className="flex items-center justify-center rounded-full w-12 h-12 bg-primary text-white cursor-pointer transition-all duration-200 ease-in-out relative"
          >
            <Icon icon="gravity-ui:plus" className="text-xl" />
          </div>
          <FollowRequests />
          <Notifications />

          <Link
            to="/chat"
            className="flex items-center justify-center rounded-full text-primary w-12 h-12 bg-gray-200 hover:bg-primary hover:text-white cursor-pointer transition-all duration-200 ease-in-out relative"
          >
            <Icon icon="bi:chat-fill" className="text-xl" />
          </Link>
          <ProfileMenu />
        </div>
      </div>
      <CreatePost isOpen={isPostModalOpen} setIsOpen={setIsPostModalOpen} />
    </>
  );
}

export default Topbar;
