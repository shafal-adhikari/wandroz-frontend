import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, useEffect, useState } from "react";
import {
  followUser,
  getProfileById,
  uploadProfilePicture,
} from "../../store/user/user-actions";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import { FollowingStatus } from "../../store/user/user-slice";
import Modal from "../../components/shared/ui/Modal";
import { EditBasic } from "../../components/Edit/EditBasic";
import { EditSocial } from "../../components/Edit/EditSocial";
import Followers from "../../components/Followers/Followers";
import { getProfilePosts } from "../../store/post/post-actions";

export function Profile() {
  const { userProfile, user, profileUploadLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { userPosts } = useSelector((state: RootState) => state.post);
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
      dispatch(getProfilePosts(userId));
    }
  }, [dispatch, userId]);
  useEffect(() => {
    if (!userId && user) {
      dispatch(getProfilePosts(user._id));
    }
  }, [userId, user, dispatch]);
  const userData = {
    _id: userId ? userProfile?._id : user?._id,
    privacy: userId ? userProfile?.privacy : null,
    profilePicture: userId ? userProfile?.profilePicture : user?.profilePicture,
    firstName: userId ? userProfile?.firstName : user?.firstName,
    lastName: userId ? userProfile?.lastName : user?.lastName,
    followersCount: userId ? userProfile?.followersCount : user?.followersCount,
    followingCount: userId ? userProfile?.followingCount : user?.followingCount,
    postsCount: userId ? userProfile?.postsCount : user?.postsCount,
    email: userId ? null : user?.email,
    work: userId ? userProfile?.work : user?.work,
    school: userId ? userProfile?.school : user?.school,
    location: userId ? userProfile?.location : user?.location,
    social: {
      facebook: userId ? userProfile?.social?.facebook : user?.social?.facebook,
      instagram: userId
        ? userProfile?.social?.instagram
        : user?.social?.instagram,
      twitter: userId ? userProfile?.social?.twitter : user?.social?.twitter,
      youtube: userId ? userProfile?.social?.youtube : user?.social?.youtube,
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
  const [editModals, setEditModals] = useState({
    basic: false,
    social: false,
    followers: false,
    following: false,
  });
  const toggleModalHandler = (key: string, value: boolean) => {
    setEditModals((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  return (
    <>
      <div className="w-[70vw] mx-auto bg-white h-auto p-4 rounded-2xl my-5 shadow-xl">
        <div className="w-full h-[10vh]">
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
              {!userId && (
                <>
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
                </>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex gap-2 items-center text-2xl text-slate-800 cursor-pointer">
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
                <span className="text-md text-slate-600">
                  {userData?.email}
                </span>
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
            <div
              className={`flex gap-1 ${
                (userData.followingStatus === "FOLLOWING" ||
                  userData.privacy == "PUBLIC") &&
                "cursor-pointer"
              }`}
              onClick={() => {
                (userData.followingStatus === "FOLLOWING" ||
                  userData.privacy == "PUBLIC") &&
                  toggleModalHandler("followers", true);
              }}
            >
              <span className="text-xl text-slate-600">
                {userData?.followersCount}
              </span>
              <span className="text-xl text-slate-800">Followers</span>
            </div>
            <div
              className={`flex gap-1 ${!userId && "cursor-pointer"}`}
              onClick={() => {
                if (!userId) toggleModalHandler("following", true);
              }}
            >
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
                      ? `Lives in ${userData.location}`
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
                      ? `Works at ${userData.work}`
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
                      ? `Studied at ${userData.school}`
                      : "Not Specified"}
                  </span>
                </div>
                {!userId && (
                  <button
                    onClick={() => toggleModalHandler("basic", true)}
                    className="px-3 py-3 mt-2 font-semibold bg-slate-100 flex items-center rounded-xl justify-center text-slate-800"
                  >
                    Edit Basic Info
                  </button>
                )}
              </div>
              <div className="w-full flex flex-col gap-3">
                <span className="text-xl text-slate-600 font-semibold">
                  Social Profile
                </span>
                <div className="flex gap-4">
                  <Icon
                    icon="mdi:facebook"
                    className="text-xl text-slate-600"
                  />
                  <span className="text-md text-slate-600">
                    {userData.social.facebook?.length
                      ? `${userData.social.facebook}`
                      : "Not Specified"}
                  </span>
                </div>
                <div className="flex gap-4">
                  <Icon
                    icon="mdi:instagram"
                    className="text-xl text-slate-600"
                  />
                  <span className="text-md text-slate-600">
                    {userData.social.instagram?.length
                      ? `${userData.social.instagram}`
                      : "Not Specified"}
                  </span>
                </div>
                <div className="flex gap-4">
                  <Icon icon="mdi:twitter" className="text-xl text-slate-600" />
                  <span className="text-md text-slate-600">
                    {userData.social.twitter?.length
                      ? `${userData.social.twitter}`
                      : "Not Specified"}
                  </span>
                </div>
                <div className="flex gap-4">
                  <Icon icon="mdi:youtube" className="text-xl text-slate-600" />
                  <span className="text-md text-slate-600">
                    {userData.social.youtube?.length
                      ? `${userData.social.youtube}`
                      : "Not Specified"}
                  </span>
                </div>
                {!userId && (
                  <button
                    onClick={() => toggleModalHandler("social", true)}
                    className="px-3 py-3 mt-2 font-semibold bg-slate-100 flex items-center rounded-xl justify-center text-slate-800"
                  >
                    Edit Social Profile
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col w-[65%] px-5 gap-5">
              {userPosts.length ? (
                userPosts.map((post) => {
                  return (
                    <Post
                      privacy={post.privacy}
                      comments={post.comments ?? []}
                      authorId={post.userId}
                      id={post._id}
                      key={post._id}
                      userReaction={post.userReaction!}
                      content={post.post}
                      authorPicture={post.profilePicture!}
                      author={`${post.firstName} ${post.lastName}`}
                      time={post.createdAt!}
                      images={post.imageLinks}
                      reactions={post.reactions!}
                      reactionCount={post.reactionCount!}
                      commentsCount={post.commentsCount}
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
      <Modal
        staticBackdrop={true}
        isOpen={editModals.basic}
        closeModal={() => toggleModalHandler("basic", false)}
        title="Edit Basic Info"
      >
        <EditBasic closeModal={() => toggleModalHandler("basic", false)} />
      </Modal>
      <Modal
        staticBackdrop={true}
        isOpen={editModals.social}
        closeModal={() => toggleModalHandler("social", false)}
        title="Edit Basic Info"
      >
        <EditSocial closeModal={() => toggleModalHandler("social", false)} />
      </Modal>
      <Modal
        isOpen={editModals.social}
        closeModal={() => toggleModalHandler("social", false)}
        title="Edit Basic Info"
      >
        <EditSocial closeModal={() => toggleModalHandler("social", false)} />
      </Modal>
      <Modal
        className="h-[10rem] overflow-auto"
        isOpen={editModals.followers}
        closeModal={() => toggleModalHandler("followers", false)}
        title="Followers"
      >
        <Followers
          userType="followers"
          userId={userId ?? user?._id}
          closeModal={() => toggleModalHandler("followers", false)}
        />
      </Modal>
      <Modal
        className="h-[10rem] overflow-auto"
        isOpen={editModals.following}
        closeModal={() => toggleModalHandler("following", false)}
        title="Followings"
      >
        <Followers
          userType="followings"
          userId={userId ?? user?._id}
          closeModal={() => toggleModalHandler("following", false)}
        />
      </Modal>
    </>
  );
}
export default Profile;
