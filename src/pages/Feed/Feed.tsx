import Post from "../../components/Post/Post";

function Feed() {
  return (
    <>
      <div className="w-[40vw] flex flex-col gap-3 mx-auto">
        <Post
          title=""
          author="John Doe"
          authorPicture="https://www.w3schools.com/howto/img_avatar.png"
          time="2 hours ago"
          isSaved={true}
          images={[
            "https://picsum.photos/id/1/1800/1500",
            "https://picsum.photos/id/2/1800/1500",
            "https://picsum.photos/id/3/1800/1500",
          ]}
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        />
      </div>
    </>
  );
}

export default Feed;
