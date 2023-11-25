import { useEffect, useState } from "react";
import { DiskSpaceProgressBar } from "../components/DiskSize";
import { Header } from "../components/Header";
import { IconFile } from "../components/IconFile";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";


interface TFile {
  id: string,
  key: string,
  name: string,
  path: string,
  size: number,
}

const calcularSomaTamanhos = (array: TFile[]) => {
  return array.reduce((soma, objeto) => soma + objeto.size, 0);
};

function formatarTamanho(bytes: number) {
  const gigabyte = 1024 * 1024 * 1024;
  const megabyte = 1024 * 1024;

  if (bytes >= gigabyte) {
    return (bytes / gigabyte).toFixed(1) + ' GB';
  } else if (bytes >= megabyte) {
    return (bytes / megabyte).toFixed(1) + ' MB';
  } else {
    return bytes + ' bytes';
  }
}

export function Home() {
  const { logout } = useAuth()
  const [files, setFiles] = useState<TFile[]>([])

  useEffect(() => {
    (async () => {

      api.defaults.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      const { data } = await api.get("/files/user");
      console.log(data)

      setFiles(data);
    })();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col gap-6 bg-gradient-to-b from-indigo-500 to-white">

      <Header />

      <main className="">
        <div className="flex flex-row gap-2">
          {files.map(file => (

            <div key={file.id} className="bg-yellow-600 w-[100px] h-[100px]" >
              <IconFile fileName={file.name} />

              {file.name}

            </div>

          ))}
        </div>
      </main>

      <br />
      <br />
      <br />
      <br />
      <br />

      <div>Total em bytes: {formatarTamanho(calcularSomaTamanhos(files))}</div>

      <DiskSpaceProgressBar usedSpace={calcularSomaTamanhos(files)} />


      <button className="bg-blue-500 h-10 rounded-lg" onClick={logout}>Sair</button>
    </div>
  )
}