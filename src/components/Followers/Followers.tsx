import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers, getFollowings } from "../../store/user/user-actions";
import { Icon } from "@iconify/react";
import { Follow } from "../../store/user/user-slice";
import Input from "../shared/ui/Input";
import { useNavigate } from "react-router-dom";

function Followers({
  userType,
  userId,
  closeModal,
}: {
  userType: string;
  userId?: string;
  closeModal: () => void;
}) {
  const dispatch: AppDispatch = useDispatch();
  const { followers, followings, followersLoading } = useSelector(
    (state: RootState) => state.user
  );
  const [users, setUsers] = useState<Follow[]>([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (userType == "followings") {
      dispatch(getFollowings());
    } else {
      dispatch(getFollowers(userId!));
    }
  }, [userType, userId, dispatch]);
  useEffect(() => {
    if (userType == "followings" && followings.length) {
      setUsers(followings);
    } else if (followers.length) {
      setUsers(followers);
    }
  }, [followers, followings, userType]);
  useEffect(() => {
    setUsers(() => {
      const filteringUsers = userType == "followings" ? followings : followers;
      return filteringUsers.filter((user) => {
        return (
          user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    });
  }, [searchText, followers, followings, userType]);
  return followersLoading ? (
    <div className="flex items-center justify-center">
      <Icon icon="gg:spinner" className="animate-spin" />
    </div>
  ) : (
    <div className="w-full flex items-center flex-col gap-4">
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
        value={searchText}
        className="w-[32rem] px-4 py-0 h-12 rounded-md"
        type="text"
        icon={<Icon icon="bx:bx-search" className="text-xl text-slate-600" />}
        inputClassName="text-md text-slate-600"
        placeholder="Search..."
      />
      {users.map((user, index) => {
        return (
          <div
            onClick={() => {
              closeModal();
              setTimeout(() => {
                navigate(`/profile/${user._id}`);
              }, 200);
            }}
            className="cursor-pointer flex gap-5 w-full px-4 py-2 text-md items-center font-semibold hover:bg-slate-100 rounded-md"
            key={index}
          >
            <img
              className="w-10 h-10 rounded-full"
              src={
                user.profilePicture.length
                  ? user.profilePicture
                  : "/default-avatar.webp"
              }
              alt={user.firstName}
            />
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Followers;
