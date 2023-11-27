import { FaUpload } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Button } from "./Button"
import { DropdownMenu } from "./DropdownMenu"

export function Header() {

  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="w-full h-24 bg-white border-b border-green-700 px-4 flex items-center justify-between" >
      <h1 className="text-black text-3xl font-bold">LocalDrive</h1>

      <Button onClick={() => navigate("/upload")}>
        <span className="font-bold text-lg">
          Novo upload
        </span>
        <FaUpload size={24} />
      </Button>

      <div className="flex flex-row items-center gap-6">
        <span className="font-bold text-xl">{user?.name}</span>
        <DropdownMenu />
      </div>
    </header>
  )
}