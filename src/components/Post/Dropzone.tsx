import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({
  accept,
  files,
  setFiles,
}: {
  accept: { [key: string]: string[] };
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept,
  });
  const removeImageHandler = (index: number) => {
    setFiles((files) => {
      const newFiles = files.filter((_, i) => {
        return i !== index;
      });
      return newFiles;
    });
  };
  return (
    <>
      <div
        {...getRootProps()}
        className="w-full h-[5rem] flex flex-col gap-2 items-center justify-center border rounded-xl"
      >
        <input {...getInputProps()} />

        <>
          <Icon
            icon="heroicons:photo-solid"
            className="text-3xl text-green-600"
          />
          {isDragActive ? (
            <p>Drop the photos here ...</p>
          ) : (
            <p>Drag n Drop / Select Photos</p>
          )}
        </>
      </div>
      <div className="flex gap-2 flex-wrap">
        {files.length > 0 &&
          files.map((file, index) => (
            <div className="relative" key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview of ${file.name}`}
                className="object-cover w-[10rem] h-[8rem]"
              />
              <div
                onClick={() => removeImageHandler(index)}
                className="cursor-pointer mx-auto left-1/2 py-1 px-2 -translate-x-1/2 absolute bottom-2 flex items-center justify-center text-sm bg-red-600 rounded-lg text-white"
              >
                Remove
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Dropzone;
