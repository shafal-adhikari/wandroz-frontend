import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Icon } from "@iconify/react";
import { getTimeAgo } from "../../utils/date";
import { CommentData, IReactions } from "../../store/post/post-slice";
import { capitalizeFirstLetter } from "../../utils/common";
import { FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  addComment,
  deletePost,
  reactToPost,
  removeReaction,
} from "../../store/post/post-actions";
import Input from "../shared/ui/Input";
import { toast } from "react-toastify";
import PostComment from "../Comment/Comment";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router-dom";

function Post({
  id,
  author,
  authorId,
  authorPicture,
  time,
  images,
  content,
  reactions,
  reactionCount,
  commentsCount,
  comments,
  userReaction,
  isSingle,
}: {
  id: string;
  authorId: string;
  author: string;
  authorPicture: string;
  time: Date;
  images?: string[];
  content: string;
  userReaction: string;
  reactions: IReactions;
  reactionCount: number;
  comments: CommentData[];
  isSingle?: boolean;
  commentsCount: number;
}) {
  const dispatch: AppDispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const getTopThreeValues = (obj: IReactions): Partial<IReactions> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filteredObj = Object.entries(obj).filter(([_, value]) => value !== 0);

    filteredObj.sort((a, b) => b[1] - a[1]);

    const topThree = filteredObj.slice(0, 3);

    const result: { [key: string]: number } = {};
    topThree.forEach(([key, value]) => {
      result[key] = value;
    });

    return result;
  };
  const { user } = useSelector((state: RootState) => state.user);
  const [showReactions, setShowReactions] = useState(false);
  const toggleReactions = () => {
    setShowReactions(!showReactions);
  };
  const handleReactionClick = (reaction: string) => {
    dispatch(
      reactToPost({
        postId: id,
        type: reaction,
        previousReaction: userReaction,
      })
    );
    setShowReactions(false);
  };
  const addCommentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        addComment({
          comment: commentText,
          postId: id,
          profilePicture: user?.profilePicture,
          firstName: user?.firstName,
          lastName: user?.lastName,
        })
      ).unwrap();
      setCommentText("");
    } catch (error) {
      toast.error((error as string) ?? "Failed to add comment");
    }
  };
  const commentRef = useRef<HTMLInputElement>(null);
  const removeReactionHandler = () => {
    try {
      dispatch(removeReaction({ postId: id, previousReaction: userReaction }));
    } catch (error) {
      toast.error(error as string);
    }
  };
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string>();
  return (
    <>
      <div className="w-full h-auto flex flex-col gap-2 rounded-md py-6 px-10 bg-white shadow-xl">
        <div className="w-full h-auto flex justify-between items-center">
          <div className="h-auto flex gap-2">
            <img
              src={
                authorPicture.length ? authorPicture : "/default-avatar.webp"
              }
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-md text-slate-700 font-bold">{author}</span>
              <span className="text-sm text-slate-500">{getTimeAgo(time)}</span>
            </div>
          </div>
          {authorId == user?._id && (
            <div className="flex gap-2 text-xl">
              <Icon
                icon="heroicons:pencil-square"
                className="cursor-pointer"
                onClick={() => {
                  setSelectedPost(id);
                  setIsEditOpen(true);
                }}
              />
              <Icon
                icon="heroicons:trash"
                className="cursor-pointer"
                onClick={() => {
                  dispatch(deletePost(id));
                }}
              />
            </div>
          )}
        </div>
        {content.length > 0 && (
          <div className="text-md text-slate-900">{content}</div>
        )}
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="w-full"
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                className="w-full aspect-[10/7] object-cover mt-2"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {(reactionCount > 0 || commentsCount > 0) && (
          <div className="flex p-2 h-10 items-center justify-between">
            <div className="flex items-center">
              {Object.keys(getTopThreeValues(reactions)).map((icon, i) => {
                return (
                  <img
                    key={i}
                    className="w-5 h-5"
                    style={{ marginLeft: -i * 2 }}
                    src={`/reactions/${icon}.png`}
                  />
                );
              })}
              {reactionCount > 0 && (
                <span className="text-slate-700 ml-2">{reactionCount}</span>
              )}
            </div>
            {commentsCount > 0 && (
              <span
                className="text-slate-700 justify-self-center cursor-pointer"
                onClick={() => {
                  if (!isSingle) navigate(`/post/${id}`);
                }}
              >
                {commentsCount} {commentsCount > 1 ? "comments" : "comment"}
              </span>
            )}
          </div>
        )}
        <div className="w-full h-15 flex justify-between items-end py-2">
          <div
            className="grow flex flex-col gap-3 w-1/2 z-10"
            onMouseEnter={toggleReactions}
            onMouseLeave={toggleReactions}
          >
            {showReactions && (
              <div className="flex rounded-full p-3 -mt-10 -ml-14 shadow-lg gap-2 bg-white w-fit">
                {Object.keys(reactions).map((reaction, i) => {
                  if (reaction.length > 0)
                    return (
                      <img
                        key={i}
                        src={`/reactions/${reaction}.png`}
                        className="w-8 h-8 cursor-pointer"
                        onClick={() => handleReactionClick(reaction)}
                      />
                    );
                })}
              </div>
            )}
            {userReaction.length &&
            Object.keys(reactions).includes(userReaction) ? (
              <div
                className="flex gap-3 cursor-pointer"
                onClick={() => removeReactionHandler()}
              >
                <img
                  src={`/reactions/${userReaction}.png`}
                  className="w-6 h-6"
                />
                {capitalizeFirstLetter(userReaction)}
              </div>
            ) : (
              <div
                className="flex gap-3 cursor-pointer"
                onClick={() => {
                  dispatch(
                    reactToPost({
                      postId: id,
                      type: "like",
                      previousReaction: userReaction,
                    })
                  );
                }}
              >
                <Icon icon={"heroicons:hand-thumb-up"} className="text-3xl" />
                Like
              </div>
            )}
          </div>

          <div
            className="grow flex items-center gap-3 justify-center cursor-pointer"
            onClick={() => commentRef.current?.focus()}
          >
            <Icon
              icon={"heroicons:chat-bubble-bottom-center-text"}
              className="text-3xl"
            />
            Comment
          </div>
        </div>
        <hr />
        {comments.length > 0 && (
          <div className="flex flex-col gap-2 py-2">
            {comments.length !== commentsCount && (
              <span
                className="text-md font-semibold text-slate-600 py-1 cursor-pointer"
                onClick={() => {
                  navigate(`/post/${id}`);
                }}
              >
                View Comments
              </span>
            )}
            {comments?.map((comment, i) => {
              return <PostComment comment={comment} key={i} />;
            })}
          </div>
        )}
        <form className="w-full" onSubmit={addCommentHandler}>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCommentText(e.target.value)
            }
            value={commentText}
            ref={commentRef}
            className="w-full px-4 py-0 h-12 mt-2 rounded-xl relative"
            type="text"
            icon={
              <Icon
                icon="heroicons:chat-bubble-bottom-center-text"
                className="text-xl text-slate-600"
              />
            }
            inputClassName="text-md text-slate-600"
            placeholder="Add a comment"
          />
        </form>
      </div>
      <CreatePost
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        postId={selectedPost}
      />
    </>
  );
}

export default Post;
