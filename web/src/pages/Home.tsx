import { useEffect, useState } from "react";
import { CardFile } from "../components/CardFile";
import { DiskSpaceProgressBar } from "../components/DiskSize";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";

export interface TFile {
  id: string,
  key: string,
  name: string,
  path: string,
  size: number,
}
// eslint-disable-next-line react-refresh/only-export-components
export function calcularSomaTamanhos(array: TFile[]) {
  return array.reduce((soma, objeto) => soma + objeto.size, 0);
}

// eslint-disable-next-line react-refresh/only-export-components
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
  } else {
    return bytes + ' bytes';
  }
}

export function Home() {
  const [files, setFiles] = useState<TFile[]>([])
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      api.defaults.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      const { data } = await api.get("/files/user");

      setFiles(data);
    })();
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-indigo-500 to-white items-center">
      <Header />

      <div className="w-full h-16 bg-white flex items-center justify-center">
        <div className="max-w-6xl w-full h-full bg-white flex items-center px-4 justify-between">
          <Input type="search" value={search} placeholder="Buscar arquivo" onclickSerch={() => alert(search)} onChange={(e) => setSearch(e.target.value)} />

          <DiskSpaceProgressBar usedSpace={calcularSomaTamanhos(files)} files={files} />
        </div>
      </div>

      <main className="max-w-6xl w-full flex px-4 mt-4">

        <div className="flex justify-stretch flex-wrap gap-2">
          {files.map(file => (
            <CardFile fileName={file.name}/>
          ))}
        </div>
      </main>
    </div>
  )
}