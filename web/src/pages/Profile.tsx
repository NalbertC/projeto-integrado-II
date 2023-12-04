import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { TbPencilMinus } from "react-icons/tb";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";

export function Profile() {
  const { user } = useAuth()
  const [isEdited, setIsEdited] = useState(false)

  const [newName, setNewName] = useState(user?.name)
  const [newEmail, setNewEmail] = useState(user?.email)
  const [newUserName, setNewUserName] = useState(user?.username)

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-b from-indigo-500 to-white items-center">

      <Header />

      {isEdited ? <>
        <form className="w-[472px] min-h-[256px] bg-white rounded-3xl shadow mt-6 py-10 px-11 flex flex-col gap-9">

          <div className="flex flex-col gap-1 text-lg">
            <div className="flex flex-col gap-1">
              <span className="font-bold px-4">Nome</span>
              <Input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>

            <div className="flex flex-col gap-1 text-lg">
              <span className="font-bold  px-4">Email</span>
              <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />

            </div>

            <div className="flex flex-col gap-1 text-lg" >
              <span className="font-bold  px-4">Nome de usuário</span>
              <Input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
            </div>
          </div>

          <div className="w-full flex gap-6">
            <button type="button" className=" h-14 rounded-full text-xl font-semibold w-full bg-red-500  border border-white" onClick={() => {
              setIsEdited(false)
            }} >Cancelar</button>

            <button type="submit" className=" h-14 rounded-full text-xl font-semibold w-full bg-green-500  border border-white">Atualizar</button>
          </div>
        </form>
      </> : <>
        <div className="w-[872px] min-h-[256px] bg-white rounded-3xl shadow mt-6 pt-12 px-11 flex items-start justify-between">

          <div className="flex items-start gap-9">
            <div className="w-36 h-36 bg-zinc-300 rounded-full flex justify-center items-center">
              <FaUser size={56} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-[22px]">Dados pessoais</span>

              <div className="flex flex-col gap-1 text-lg">
                <div>
                  <span className="font-bold ">Nome: </span>
                  <span className="">{user?.name}</span>
                </div>

                <div>
                  <span className="font-bold ">Email: </span>
                  <span className="">{user?.email}</span>
                </div>
                <div>
                  <span className="font-bold ">Nome de usuário: </span>
                  <span className="">{user?.username}</span>
                </div>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-1 hover:bg-slate-300 py-2 px-3 rounded-md" onClick={() => setIsEdited(true)}>
            <span className="font-bold">Editar</span>
            <TbPencilMinus size={20} />
          </button>
        </div>
      </>}
    </div>
  )
}