import React, { useState } from "react";

import diversos from "../assets/carbon_cics-program.svg";
import video from "../assets/gridicons_video.svg";
import music from "../assets/mingcute_music-line.svg";
import image from "../assets/mynaui_image.svg";
import documents from "../assets/solar_documents-outline.svg";


import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Dropzone } from "../components/Dropzone";
import { api } from "../services/api";

export function Upload() {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState<File>();

  async function handleSubimit(event: React.FormEvent) {
    event.preventDefault()
    if (selectedFile === null || selectedFile === undefined) {
      alert("Por favor selecione algum arquivo");
    } else {
      const data = new FormData();
      !!selectedFile && data.append("file", selectedFile);

      try {
        api.defaults.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
        const response = await api.post("/files/upload", data)
        alert(response.data)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error)
          alert(error.response?.data)
        }
      }
      setSelectedFile(undefined)
    }
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-indigo-500 to-white items-center py-16 justify-between">

      <form className="bg-white rounded-3xl max-w-[877px] w-full py-14 flex flex-col items-center justify-center gap-6" onSubmit={handleSubimit}>
        <Dropzone onFileUploaded={setSelectedFile} selectedFile={selectedFile} />

        {selectedFile ? <>
          <div className="w-full max-w-[710px] flex gap-6">

            <button type="button" className=" h-14 rounded-full text-xl font-semibold w-full bg-red-500  border border-white" onClick={() => {
              setSelectedFile(undefined)
            }} >Cancelar</button>

            <button type="submit" className=" h-14 rounded-full text-xl font-semibold w-full bg-green-500  border border-white">Enviar arquivo</button>
          </div>
        </> : <></>}
      </form>

      {selectedFile ? <></> : <Button type="button"
        onClick={() => navigate("/")} >Voltar para Home</Button>}

      <div className="w-[999px] h-[234px] bg-white rounded-[200px] shadow-inner border border-green-700 flex flex-col items-center justify-evenly font-bold">

        <p className="text-xl">Tipos de arquivos susportados</p>
        <div className="font-bold flex w-full px-16 justify-between">

          <div className="w-[152px] h-[145px] bg-cyan-400 bg-opacity-10 rounded-[20px] shadow border border-black border-opacity-50 flex flex-col items-center justify-evenly">
            <div className="w-[126px] h-[62px] bg-orange-400 rounded-[50px] shadow border border-white flex items-center justify-center">
              <img src={video} alt="" />
            </div>
            <p className="text-lg">Vídeos</p>
          </div>

          <div className="w-[152px] h-[145px] bg-cyan-400 bg-opacity-10 rounded-[20px] shadow border border-black border-opacity-50 flex flex-col items-center justify-evenly">
            <div className="w-[126px] h-[62px] bg-[#FFD644] rounded-[50px] shadow border border-white flex items-center justify-center">
              <img src={image} alt="" />
            </div>
            <p className="text-lg">Fotos</p>
          </div>

          <div className="w-[152px] h-[145px] bg-cyan-400 bg-opacity-10 rounded-[20px] shadow border border-black border-opacity-50 flex flex-col items-center justify-evenly">
            <div className="w-[126px] h-[62px] bg-[#44FF84] rounded-[50px] shadow border border-white flex items-center justify-center">
              <img src={documents} alt="" />
            </div>
            <p className="text-lg">Documentos</p>
          </div>

          <div className="w-[152px] h-[145px] bg-cyan-400 bg-opacity-10 rounded-[20px] shadow border border-black border-opacity-50 flex flex-col items-center justify-evenly">
            <div className="w-[126px] h-[62px] bg-[#44D2FF] rounded-[50px] shadow border border-white flex items-center justify-center">
              <img src={diversos} alt="" />
            </div>
            <p className="text-lg">Diversos</p>
          </div>

          <div className="w-[152px] h-[145px] bg-cyan-400 bg-opacity-10 rounded-[20px] shadow border border-black border-opacity-50 flex flex-col items-center justify-evenly">
            <div className="w-[126px] h-[62px] bg-[#4457FF] rounded-[50px] shadow border border-white flex items-center justify-center">
              <img src={music} alt="" />
            </div>
            <p className="text-lg">Músicas</p>
          </div>
        </div>
      </div>

    </div>

  )
}