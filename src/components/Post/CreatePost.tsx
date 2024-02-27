import Modal from "../shared/ui/Modal";
import Dropzone from "./Dropzone";

function CreatePost({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsOpen: any;
}) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Create Post">
      <Dropzone />
    </Modal>
  );
}

export default CreatePost;
