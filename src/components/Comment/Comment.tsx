import { CommentData } from "../../store/post/post-slice";

function PostComment({ comment }: { comment: CommentData }) {
  return (
    <div className="flex gap-2 items-start w-full">
      <img
        src={comment.profilePicture ?? "/default-avatar.webp"}
        className="w-10 h-10 rounded-full"
      />
      <div className="w-fit rounded-2xl bg-slate-200 flex flex-col py-2 px-3">
        <span className="text-sm text-slate-700 font-semibold">
          {comment.firstName} {comment.lastName}
        </span>
        <span className="text-sm text-slate-800">{comment.comment}</span>
      </div>
    </div>
  );
}

export default PostComment;
