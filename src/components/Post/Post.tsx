import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Icon } from "@iconify/react";
function Post({
  author,
  authorPicture,
  time,
  images,
  content,
}: {
  title: string;
  author: string;
  authorPicture: string;
  time: string;
  images?: string[];
  content?: string;
}) {
  return (
    <div className="w-full h-auto flex flex-col gap-5 rounded-md py-6 px-10 bg-white shadow-2xl">
      <div className="w-full h-auto flex justify-between">
        <div className="h-auto flex gap-2">
          <img
            src={authorPicture.length ? authorPicture : "/default-avatar.webp"}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-md text-slate-700 font-bold">{author}</span>
            <span className="text-sm text-slate-500">{time}</span>
          </div>
        </div>
      </div>
      {content?.length && (
        <div className="text-md text-slate-900">{content}</div>
      )}
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="w-full max-h-30"
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} className="w-full" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full h-auto flex justify-between">
        <div className="grow flex items-center gap-3 justify-center">
          <Icon icon={"mdi:heart-outline"} className="text-3xl" />
          Like
        </div>
        <div className="grow flex items-center gap-3 justify-center">
          <Icon icon={"basil:comment-outline"} className="text-3xl" />
          Comment
        </div>
        <div className="grow flex items-center gap-3 justify-center">
          <Icon icon={"carbon:share"} className="text-3xl" />
          Share
        </div>
      </div>
    </div>
  );
}

export default Post;
