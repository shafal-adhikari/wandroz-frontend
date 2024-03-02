import { useDispatch, useSelector } from "react-redux";
import Modal from "../shared/ui/Modal";
import { AppDispatch, RootState } from "../../store/store";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Dropzone from "./Dropzone";
import { uploadPost } from "../../store/post/post-actions";
import { fileToBase64 } from "../../utils/common";

export default function CreatePost({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsOpen: any;
}) {
  const { user } = useSelector((state: RootState) => state.user);
  const { uploadLoading } = useSelector((state: RootState) => state.post);
  const [isPhotos, setIsPhotos] = useState(false);
  const [body, setBody] = useState({
    privacy: "Public",
    post: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const uploadPostHandler = async () => {
    const images: string[] = await Promise.all(
      files.map(async (file) => {
        const base64String = await fileToBase64(file);
        return base64String;
      })
    );
    await dispatch(
      uploadPost({
        privacy: body.privacy,
        post: body.post,
        images: images.length > 0 ? images : undefined,
      })
    );
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
      staticBackdrop={true}
      title="Create Post"
    >
      <div className="flex w-full h-auto p-3 flex-col gap-3">
        <div className="flex gap-2">
          <img
            src={
              user?.profilePicture.length
                ? user?.profilePicture
                : "/default-avatar.webp"
            }
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-md text-slate-700 font-semibold">
              {user?.firstName} {user?.lastName}
            </span>
            <Menu as="div">
              <Menu.Button className="flex gap-2 bg-slate-100 text-sm font-semibold items-center text-slate-600 outline-none py-1 rounded-lg px-2">
                <Icon
                  icon={
                    body.privacy == "Public"
                      ? "heroicons:globe-alt"
                      : "heroicons:lock-closed"
                  }
                />
                {body.privacy}
              </Menu.Button>
              <Menu.Items className="shadow-sm w-fit">
                {body.privacy !== "Public" && (
                  <Menu.Item>
                    <div
                      className="flex gap-2 bg-whitetext-sm font-semibold items-center text-slate-600 py-1 px-2 cursor-pointer"
                      onClick={() => {
                        setBody((prevBody) => {
                          return {
                            ...prevBody,
                            privacy: "Public",
                          };
                        });
                      }}
                    >
                      <Icon icon={"heroicons:globe-alt"} />
                      Public
                    </div>
                  </Menu.Item>
                )}
                {body.privacy !== "Private" && (
                  <Menu.Item>
                    <div
                      className="flex gap-2 bg-white text-sm font-semibold items-center text-slate-600 py-1 px-2 cursor-pointer"
                      onClick={() => {
                        setBody((prevBody) => {
                          return {
                            ...prevBody,
                            privacy: "Private",
                          };
                        });
                      }}
                    >
                      <Icon icon={"heroicons:lock-closed"} />
                      Private
                    </div>
                  </Menu.Item>
                )}
              </Menu.Items>
            </Menu>
          </div>
        </div>
        <textarea
          value={body.post}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setBody((prev) => {
              return {
                ...prev,
                post: e.target.value,
              };
            })
          }
          className={`w-full bg-none outline-none border-none ${
            !isPhotos ? "h-[10rem]" : "h-auto"
          } text-lg text-slate-700`}
          placeholder="What's on your mind?"
        ></textarea>
        {isPhotos && (
          <Dropzone
            files={files}
            setFiles={setFiles}
            accept={{
              "image/jpeg": [".jpeg", ".jpg", ".JPEG", ".JPG"],
              "image/png": [".png", ".PNG"],
              "image/webp": [".webp", ".WEBP"],
            }}
          />
        )}
        <div className="sticky border border-slate-200 mx-2 rounded-xl p-3 flex justify-between items-center">
          Add to your post
          <div className="flex gap-3">
            <Icon
              onClick={() => setIsPhotos(!isPhotos)}
              icon="heroicons:photo-solid"
              className="text-2xl text-green-600 cursor-pointer"
            />
            {/* <Icon
              icon="heroicons:video-camera-solid"
              className="text-2xl text-red-600 cursor-pointer"
            /> */}
            {/* <Icon
              icon="heroicons:gif-solid"
              className="text-2xl text-blue-600 cursor-pointer"
            /> */}
          </div>
        </div>
        <button
          onClick={uploadPostHandler}
          disabled={body.post.length < 1 && files.length < 1}
          className="outline-none flex w-full items-center gap-2 justify-center bg-primary text-white font-semibold py-2 rounded-md"
        >
          {uploadLoading && <Icon icon="gg:spinner" className="animate-spin" />}
          Post
        </button>
      </div>
    </Modal>
  );
}
