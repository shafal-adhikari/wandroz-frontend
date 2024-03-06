import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import { useEffect, useState } from "react";
import { getPosts } from "../../store/post/post-actions";
import { AppDispatch, RootState } from "../../store/store";
import { Icon } from "@iconify/react";
import { getSuggestedUsers } from "../../store/user/user-actions";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Feed() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const { posts, postsLoading, postsCount } = useSelector(
    (state: RootState) => state.post
  );
  const { suggestedUsers } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, [currentPage, dispatch]);
  useEffect(() => {
    dispatch(getSuggestedUsers());
  }, [dispatch]);
  return (
    <div className="flex w-[70vw] bg-white shadow-xl mx-auto py-5 gap-2 px-5">
      {/* <div className="w-[20vw] px-5 rounded-2xl flex flex-col gap-3 sticky top-[7rem] h-fit"> */}
      {/* <div className="flex px-3 items-center gap-2 w-full">
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
            <span className="text-lg text-slate-700 font-bold">
              {`${user?.firstName} ${user?.lastName} `}
            </span>
            <span className="text-sm text-slate-500 ">{user?.email}</span>
          </div>
        </div> */}
      <InfiniteScroll
        dataLength={posts.length}
        className="p-2 w-[45vw] flex flex-col gap-2 overflow-visible"
        style={{ overflow: "visible" }}
        next={() => {
          setCurrentPage(currentPage + 1);
        }}
        hasMore={postsCount !== posts.length}
        loader={
          <div className="w-full flex items-center py-2">
            <Icon className="animate-spin" icon="gg:spinner" />
          </div>
        }
      >
        {posts.length < 1 && (
          <div className="w-full text-slate-600 text-lg flex items-center justify-center">
            No Posts Found
          </div>
        )}
        {postsLoading && (
          <Icon className="animate-spin text-3xl" icon="gg:spinner" />
        )}
        {!postsLoading &&
          posts.map((post) => {
            console.log(post.comments, "stjosjos");
            return (
              <Post
                comments={post.comments ?? []}
                key={post._id}
                id={post._id}
                authorId={post.userId}
                userReaction={post.userReaction!}
                content={post.post}
                authorPicture={post.profilePicture!}
                author={`${post.firstName} ${post.lastName}`}
                time={post.createdAt!}
                images={post.imageLinks}
                reactions={post.reactions!}
                privacy={post.privacy}
                reactionCount={post.reactionCount!}
                commentsCount={post.commentsCount}
              />
            );
          })}
      </InfiniteScroll>
      <div className="w-[18vw] bg-white shadow-xl px-5 py-5 rounded-2xl flex flex-col gap-3 sticky top-[6.5rem] h-fit">
        <div className="text-md text-slate-600 px-3 font-semibold">
          Suggested Users
        </div>
        {suggestedUsers.length < 1 && (
          <div className="w-full text-slate-600 text-md flex items-center justify-center">
            No Suggestions Found
          </div>
        )}
        {suggestedUsers.map((user, i) => {
          return (
            <Link
              to={`/profile/${user._id}`}
              key={i}
              className="flex gap-3 px-3 py-2 hover:bg-slate-100 items-center"
            >
              <img
                className="cursor-pointer w-10 h-10 rounded-full"
                src={
                  user.profilePicture.length
                    ? user.profilePicture
                    : "/default-avatar.webp"
                }
              />
              <div className="flex flex-col gap-2">
                <div className="text-slate-600 text-md font-[500]">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
