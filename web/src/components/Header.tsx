import { FaBars } from "react-icons/fa"

interface HeaderProps {
}

export function Header({ }: HeaderProps) {
  return (
    <header className="w-full h-[78px] bg-white shadow border border-green-700 px-4 flex items-center" >

      <div className="flex items-center">
        <FaBars size={24} />
        <h1 className="text-black text-3xl font-bold">LocalDrive</h1>
      </div>

      <div>

      </div>
    </header>
  )
}