import { FaBars } from "react-icons/fa"
import { Input } from "./Input"

interface HeaderProps {
}

export function Header({ }: HeaderProps) {
  return (
    <header className=" w-full h-[78px] bg-white shadow border border-green-700 px-4 flex items-center justify-between" >

      <div className="flex items-center">

        <h1 className="text-black text-3xl font-bold">LocalDrive</h1>
      </div>

      <div className="flex flex-row items-center gap-6 w-full justify-end">

        <Input type="search" placeholder="Buscar arquivo"/>
        <FaBars size={24} className="cursor-pointer" />
      </div>
    </header>
  )
}