import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, useEffect, useState } from "react";
import {
  followUser,
  getProfileById,
  getProfilePosts,
  uploadProfilePicture,
} from "../../store/user/user-actions";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import { FollowingStatus } from "../../store/user/user-slice";

export function Profile() {
  const { userProfile, user, userPosts, profileUploadLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (userId == user?._id) {
      navigate("/profile");
    }
  }, [userId, navigate, user?._id]);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(getProfileById(userId));
    }
  }, [dispatch, userId]);
  useEffect(() => {
    if (!userId && user) {
      dispatch(getProfilePosts(user._id));
    }
  }, [userId, user, dispatch]);
  useEffect(() => {
    if (userId) {
      dispatch(getProfilePosts(userId));
    }
  }, [userId, dispatch]);
  const userData = {
    _id: userId ? userProfile?._id : user?._id,
    privacy: userId ? userProfile?.privacy : null,
    profilePicture: userProfile
      ? userProfile?.profilePicture
      : user?.profilePicture,
    firstName: userId ? userProfile?.firstName : user?.firstName,
    lastName: userId ? userProfile?.lastName : user?.lastName,
    followersCount: userProfile
      ? userProfile?.followersCount
      : user?.followersCount,
    followingCount: userProfile
      ? userProfile?.followingCount
      : user?.followingCount,
    postsCount: userId ? userProfile?.postsCount : user?.postsCount,
    email: userId ? null : user?.email,
    work: userId ? userProfile?.work : user?.work,
    school: userId ? userProfile?.school : user?.school,
    location: userId ? userProfile?.location : user?.location,
    social: {
      facebook: userProfile
        ? userProfile?.social?.facebook
        : user?.social?.facebook,
      instagram: userProfile
        ? userProfile?.social?.instagram
        : user?.social?.instagram,
      twitter: userProfile
        ? userProfile?.social?.twitter
        : user?.social?.twitter,
      youtube: userProfile
        ? userProfile?.social?.youtube
        : user?.social?.youtube,
    },
    followingStatus: userId ? userProfile?.followingStatus : "FOLLOWING",
  };
  const followHandler = async (userId: string) => {
    dispatch(followUser(userId));
  };
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      const imagePreview = URL.createObjectURL(e.target.files[0]);
      setImagePreview(imagePreview);

      reader.onloadend = () => {
        const base64String: string = reader.result as string;
        dispatch(uploadProfilePicture({ image: base64String }))
          .unwrap()
          .catch(() => {
            setImagePreview(null);
          });
      };
    }
  };
  return (
    <div className="w-[70vw] mx-auto bg-white h-auto p-4 rounded-2xl mt-2 shadow-xl">
      <div className="w-full h-[50vh]">
        <img
          src="https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg"
          className="w-full h-full rounded-xl object-cover "
        />
      </div>
      <div className="flex w-full justify-between py-4 px-6">
        <div className="flex gap-5 ">
          <div className="relative">
            <img
              src={
                imagePreview ??
                (userData.profilePicture?.length
                  ? userData?.profilePicture
                  : "/default-avatar.webp")
              }
              className="rounded-full w-48 h-48 -mt-28 border-white border-4 object-cover"
            />
            <div className="absolute top-0 left-0 w-48 h-48 -mt-28 flex items-center justify-center">
              {profileUploadLoading && (
                <Icon
                  icon="gg:spinner"
                  className="animate-spin text-4xl text-blue-800 bg-white rounded-full"
                />
              )}
            </div>
            <label
              htmlFor="image-input"
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center absolute bottom-4 right-10 cursor-pointer"
            >
              <Icon
                icon="heroicons:photo-solid"
                className="text-md text-slate-900"
              />
            </label>
            <input
              id="image-input"
              onChange={imageUploadHandler}
              accept="image/gif, image/png, image/jpeg, image/webp"
              type="file"
              hidden
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-2xl text-slate-800">
              {`${userData?.firstName} ${userData?.lastName}`}
            </span>
            {userId && userProfile?._id !== user?._id ? (
              <div className="flex items-center gap-3">
                {userData.followingStatus == FollowingStatus.FOLLOWING ? (
                  <button className="rounded-md px-5 py-1 bg-slate-200 text-slate-900 font-semibold">
                    Following
                  </button>
                ) : userData.followingStatus == FollowingStatus.PENDING ? (
                  <button className="rounded-md px-5 py-1 bg-slate-200 text-slate-900 font-semibold">
                    Request Sent
                  </button>
                ) : (
                  <button
                    onClick={() => followHandler(userData._id!)}
                    className="rounded-md px-5 py-1 bg-primary text-white font-semibold hover:bg-primaryHover"
                  >
                    Follow
                  </button>
                )}
              </div>
            ) : (
              <span className="text-md text-slate-600">{userData?.email}</span>
            )}
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex gap-1">
            <span className="text-xl text-slate-600">
              {userData?.postsCount}
            </span>
            <span className="text-xl text-slate-800">Posts</span>
          </div>
          <div className="flex gap-1">
            <span className="text-xl text-slate-600">
              {userData?.followersCount}
            </span>
            <span className="text-xl text-slate-800">Followers</span>
          </div>
          <div className="flex gap-1">
            <span className="text-xl text-slate-600">
              {userData?.followingCount}
            </span>
            <span className="text-xl text-slate-800">Following</span>
          </div>
        </div>
      </div>
      {userData.followingStatus === "FOLLOWING" ||
      userData.privacy == "PUBLIC" ? (
        <div className="flex space-between p-5">
          <div className="flex sticky top-[7rem] flex-col bg-white shadow-2xl px-10 py-5 rounded-2xl min-w-[35%] border-r  gap-10 h-fit">
            <div className="w-full flex flex-col gap-3">
              <span className="text-xl text-slate-600 font-semibold">
                About
              </span>
              <div className="flex gap-4">
                <Icon
                  icon="heroicons:map-pin-solid"
                  className="text-xl text-slate-600"
                />
                <span className="text-md text-slate-600">
                  {userData.location?.length
                    ? `Lives in ${userData.location.length}`
                    : "Not Specified"}
                </span>
              </div>
              <div className="flex gap-4">
                <Icon
                  icon="heroicons:briefcase-solid"
                  className="text-xl text-slate-600"
                />
                <span className="text-md text-slate-600">
                  {userData.work?.length
                    ? `Works at ${userData.work.length}`
                    : "Not Specified"}
                </span>
              </div>
              <div className="flex gap-4">
                <Icon
                  icon="heroicons:academic-cap-solid"
                  className="text-xl text-slate-600"
                />
                <span className="text-md text-slate-600">
                  {userData.school?.length
                    ? `Studied at ${userData.school.length}`
                    : "Not Specified"}
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <span className="text-xl text-slate-600 font-semibold">
                Social Links
              </span>
              <div className="flex gap-4">
                <Icon icon="mdi:facebook" className="text-xl text-slate-600" />
                <span className="text-md text-slate-600">
                  {userData.social.facebook?.length
                    ? `${userData.social.facebook.length}`
                    : "Not Specified"}
                </span>
              </div>
              <div className="flex gap-4">
                <Icon icon="mdi:instagram" className="text-xl text-slate-600" />
                <span className="text-md text-slate-600">
                  {userData.social.instagram?.length
                    ? `${userData.social.instagram.length}`
                    : "Not Specified"}
                </span>
              </div>
              <div className="flex gap-4">
                <Icon icon="mdi:twitter" className="text-xl text-slate-600" />
                <span className="text-md text-slate-600">
                  {userData.social.twitter?.length
                    ? `${userData.social.twitter.length}`
                    : "Not Specified"}
                </span>
              </div>
              <div className="flex gap-4">
                <Icon icon="mdi:youtube" className="text-xl text-slate-600" />
                <span className="text-md text-slate-600">
                  {userData.social.youtube?.length
                    ? `${userData.social.youtube.length}`
                    : "Not Specified"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[65%] px-5">
            {userPosts.length ? (
              userPosts.map((post) => {
                return (
                  <Post
                    key={post._id}
                    title={post.post}
                    authorPicture={post.profilePicture!}
                    author={`${post.firstName} ${post.lastName}`}
                    time={`${post.createdAt}`}
                    images={post.imageLinks}
                  />
                );
              })
            ) : (
              <div className="w-full p-5 text-slate-800 text-md bg-white flex items-center justify-center h-fit shadow-md rounded-xl">
                No posts found
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-5 w-full flex items-center justify-center text-slate-600 text-md">
          This account is private. Follow to get user details.
        </div>
      )}
    </div>
  );
}
export default Profile;
