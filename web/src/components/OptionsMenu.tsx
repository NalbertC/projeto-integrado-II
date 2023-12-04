import * as Popover from "@radix-ui/react-popover";
import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

interface OptionsMenuProps {
  children: ReactNode
  id: string
  fileName: string
}

export function OptionsMenu({ children, id, fileName  }: OptionsMenuProps) {

  const { refreshing, setRefreshin } = useAuth()

  async function handleDownload(fileId: string) {
    try {
      api.defaults.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      const response = await api.get(`/files/download/file/${fileId}`, {
        responseType: 'blob', // Indica que a resposta é um arquivo binário
      })

      // Cria um link temporário para download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // Substitua pelo nome desejado e extensão do arquivo
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      console.error(error);

    }
  }


  async function handleUpdate() {

  }

  async function handleDelete(fileId: string) {

    alert("Esta é uma ação irreversível");

    try {
      api.defaults.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      const response = await api.delete(`/files/file/${fileId}`)

      setRefreshin(!refreshing)
    } catch (error) {
      console.error(error);

    }

  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        {children}
      </Popover.Trigger>
      <Popover.Portal>


        <Popover.Content className="bg-white flex flex-col border-green-700 border-2 rounded-xl min-w-[230px] py-1 z-50">

          <div className="flex items-center px-4 hover:bg-slate-300 h-9 my-1" onClick={() => handleDownload(id)}>Download</div>

          <div className="mx-2 h-[1px] bg-green-700" />
          <div className="flex items-center px-4 hover:bg-slate-300 my-1 h-9">Renomear</div>
          <div className="mx-2 h-[1px] bg-green-700" />
          <div className="flex items-center px-4 hover:bg-slate-300 my-1 h-9" onClick={() => handleDelete(id)}>Deletar</div>

        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}