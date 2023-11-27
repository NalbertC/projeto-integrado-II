import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import diverse from "../assets/carbon_cics-program_ovuscate.svg";
import video from "../assets/gridicons_video_ovuscate.svg";
import music from "../assets/mingcute_music-line_ovuscate.svg";
import image from "../assets/mynaui_image_ovuscate.svg";
import document from "../assets/solar_documents-outline_ovuscate.svg";


import { formatarTamanho } from "../pages/Home";
import { IconFile } from "./IconFile";

interface DropzoneProps {
  onFileUploaded: (file: File) => void;
  selectedFile: File | undefined
}

export function Dropzone({ onFileUploaded, selectedFile }: DropzoneProps) {

  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [file, setFile] = useState<File>();



  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
    setFile(file)

  }, [selectedFile]);


  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-[710px]" {...getRootProps()}>
      <input {...getInputProps()} />

      {selectedFile ? (
        <>
          <span
            className="w-full flex flex-col items-center text-center gap-3"
          >
            <IconFile fileName={file?.name!} />

            <div className="flex gap-2">

              <span className="font-bold">
                {file?.name}
              </span>

              <span className="font-bold text-gray-500">
                {formatarTamanho(file?.size!)}
              </span>
            </div>
          </span>
        </>
      ) : (
        <>
          <span
            className="relative w-full h-[262px] rounded-[32px] p-6 border-dashed border-2 border-black flex items-center justify-center text-center text-xl text-gray-600"
            onClick={open}
          >
            Arraste e solte arquivos aqui, <br/> (Máximo 500 MB)<br /> ou<br /> clique para selecionar arquivos
            {/* <BsPlus size={50} /> */}





              <img src={video} alt="" className="absolute left-[39px] top-[91px]" />
              <img src={image} alt="" className="absolute left-[191px] top-[113px]" />
              <img src={music} alt="" className="absolute right-[227px] top-[106px]" />
              <img src={document} alt="" className="absolute right-[86px] top-[171px]" />
              <img src={diverse} alt="" className="absolute right-[23px] top-[101px]" />
          </span>
        </>
      )}


    </div>
  );
}