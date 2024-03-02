import { useSelector } from "react-redux";
import Modal from "../shared/ui/Modal";
import { RootState } from "../../store/store";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CreatePost({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsOpen: any;
}) {
  const { user } = useSelector((state: RootState) => state.user);
  const [body, setBody] = useState({
    privacy: "Public",
  });
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
          className="w-full bg-none outline-none border-none h-[10rem] text-lg text-slate-700"
          placeholder="What's on your mind?"
        ></textarea>
      </div>
    </Modal>
  );
}
