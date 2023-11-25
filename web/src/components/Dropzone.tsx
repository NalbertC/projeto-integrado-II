import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";


interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}

export function Dropzone({ onFileUploaded }: DropzoneProps) {

  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [file, setFile] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);


    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
    setFile(file)
  }, [onFileUploaded]);
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,

    noClick: true,
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div className="relative w-2/3 " {...getRootProps()}>
      <input {...getInputProps()} />


        <div className="bg-white p-6">
          <span
            className=" w-full h-56 rounded-2xl bg-[#3a3a3a]  border-dashed border border-black flex items-center justify-center text-center text-slate-400 "
            onClick={open}
          >
            Arraste e solte arquivos aqui,<br /> ou<br /> clique para selecionar arquivos

          </span>
        </div>

    </div>
  );
}