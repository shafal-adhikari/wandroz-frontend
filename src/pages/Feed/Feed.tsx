import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import { useEffect, useState } from "react";
import { getPosts } from "../../store/post/post-actions";
import { AppDispatch, RootState } from "../../store/store";
import { Icon } from "@iconify/react";
import { getSuggestedUsers } from "../../store/user/user-actions";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
function Feed() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const { posts, postsLoading, postsCount } = useSelector(
    (state: RootState) => state.post
  );
  const { suggestedUsers } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, [currentPage]);
  useEffect(() => {
    dispatch(getSuggestedUsers());
  }, []);
  return (
    <div className="flex w-[70vw] mx-auto mt-10 gap-5">
      <div className="w-[25vw] bg-white px-5 py-5 rounded-2xl shadow-2xl sticky top-[6rem] h-fit">
        <div className="text-xl text-slate-800 mb-4 font-semibold">
          Suggested Users
        </div>

        {suggestedUsers.map((user, i) => {
          return (
            <Link
              to={`/profile/${user._id}`}
              key={i}
              className="flex gap-3 px-3 py-2 hover:bg-slate-100 items-center"
            >
              <img
                className="cursor-pointer w-16 h-16 rounded-full"
                src={
                  user.profilePicture.length
                    ? user.profilePicture
                    : "/default-avatar.webp"
                }
              />
              <div className="flex flex-col gap-2">
                <div className="text-slate-800 text-lg font-[500]">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div id="scrollableDiv">
        <InfiniteScroll
          dataLength={posts.length}
          className="p-2 w-[40vw] flex flex-col gap-2"
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
          {postsLoading && (
            <Icon className="animate-spin text-3xl" icon="gg:spinner" />
          )}
          {!postsLoading &&
            posts.map((post) => {
              return (
                <Post
                  key={post._id}
                  id={post._id}
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
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Feed;
