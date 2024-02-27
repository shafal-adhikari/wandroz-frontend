import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

const Dropzone: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Do something with acceptedFiles
      setFiles(acceptedFiles);

      // handle rejected files if needed
      if (rejectedFiles && rejectedFiles.length > 0) {
        console.log("Rejected files:", rejectedFiles);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} className="">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div className="img-preview">
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index} className="w-[10rem]">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview of ${file.name}`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropzone;
