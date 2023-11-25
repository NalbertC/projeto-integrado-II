import { useState } from "react";
import { Dropzone } from "../components/Dropzone";

interface UploadProps {
}

export function Upload({ }: UploadProps) {
  const [selectedFile, setSelectedFile] = useState<File>();
  return (
    <div className="h-screen w-full flex flex-col gap-6 bg-gradient-to-b from-indigo-500 to-white justify-center items-center">




        <Dropzone  onFileUploaded={setSelectedFile} />

      <button type="submit" className=" h-14 rounded-full text-xl font-semibold w-full bg-green-500  border border-white">Enviar arquivo</button>



    </div>

  )
}