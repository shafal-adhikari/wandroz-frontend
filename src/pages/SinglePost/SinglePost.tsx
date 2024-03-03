import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getComments, getPostById } from "../../store/post/post-actions";

function SinglePost() {
  const { postId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (postId) {
      dispatch(getPostById(postId))
        .unwrap()
        .then(() => {
          dispatch(getComments(postId));
        });
    }
  }, [postId, dispatch]);
  const { post } = useSelector((state: RootState) => state.post);
  return (
    <div className="w-[50vw] mx-auto bg-white h-auto p-4 rounded-2xl my-5">
      {post && (
        <Post
          comments={post.comments ?? []}
          key={post!._id}
          id={post!._id}
          authorId={post!.userId}
          userReaction={post!.userReaction}
          content={post!.post}
          authorPicture={post!.profilePicture!}
          author={`${post!.firstName} ${post!.lastName}`}
          time={post!.createdAt!}
          images={post!.imageLinks}
          reactions={post!.reactions!}
          reactionCount={post!.reactionCount!}
          commentsCount={post!.commentsCount}
        />
      )}
    </div>
  );
}

export default SinglePost;
