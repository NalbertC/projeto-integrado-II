import { useEffect, useState } from "react";
import { DiskSpaceProgressBar } from "../components/DiskSize";
import { Header } from "../components/Header";
import { IconFile } from "../components/IconFile";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

export interface TFile {
  id: string,
  key: string,
  name: string,
  path: string,
  size: number,
  hover: boolean
}

export function calcularSomaTamanhos(array: TFile[]) {
  return array.reduce((soma, objeto) => soma + objeto.size, 0);
}

export function formatarTamanho(bytes: number) {
  const gigabyte = 1024 * 1024 * 1024;
  const megabyte = 1024 * 1024;
  const kilobyte = 1024

  if (bytes >= gigabyte) {
    return (bytes / gigabyte).toFixed(1) + ' GB';
  } else if (bytes >= megabyte) {
    return (bytes / megabyte).toFixed(2) + ' MB';
  } else if (bytes >= kilobyte) {
    return (bytes / kilobyte).toFixed(2) + ' kB';
  }  else {
    return bytes + ' bytes';
  }
}

export function Home() {
  const { logout } = useAuth()
  const [files, setFiles] = useState<TFile[]>([])
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    (async () => {
      api.defaults.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      const { data } = await api.get("/files/user");
      console.log(data)

      setFiles(data);
    })();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-indigo-500 to-white items-center">

      <Header />

      <main className="max-w-6xl w-full flex px-4 ">

        <div className="flex justify-stretch flex-wrap gap-2">
          {files.map(file => (

            <div key={file.id} className={`relative hover:bg-slate-500/50 w-[132px] rounded-lg h-[198px] flex flex-col items-center px-2 py-2 gap-2 cursor-pointer ${isHovered ? 'group' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >

              <div className="w-[116px] h-[116px] rounded-[30px] flex items-center justify-center ">

                <IconFile fileName={file.name} />
              </div>


              <div
                className={`h-full text-center w-full break-words truncate group-hover:overflow-visible group-hover:text-clip group-hover:whitespace-normal`}
              >
                {file.name}
              </div>
            </div>

          ))}
        </div>
      </main>

      <br />
      <br />
      <br />
      <br />
      <br />



      <DiskSpaceProgressBar usedSpace={calcularSomaTamanhos(files)} files={files} />


      <button className="bg-blue-500 h-10 rounded-lg" onClick={logout}>Sair</button>
    </div>
  )
}