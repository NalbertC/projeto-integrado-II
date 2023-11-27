import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const DropdownMenu = () => {
  const { logout } = useAuth()
  const navigate = useNavigate();

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <div className="flex flex-row ">

          <FaBars size={32} className="cursor-pointer" />
        </div>
      </Dropdown.Trigger>

      <Dropdown.Portal>
        <Dropdown.Content className="bg-white flex flex-col border-green-700 border-2 rounded-xl -right-[24px] absolute min-w-[280px] text-lg py-2">

          <Dropdown.Item className="h-11 px-4 flex flex-row items-center cursor-pointer focus:shadow-0 hover:bg-slate-300 focus:outline-0" onClick={() => navigate("/")}>
            Meu Perfil
          </Dropdown.Item>



          <Dropdown.Separator className="h-[1px] bg-green-700 mx-2 my-2" />

          <Dropdown.Item
            className="h-11 px-4 flex flex-row items-center cursor-pointer focus:shadow-0 hover:bg-slate-300 focus:outline-0"
            onClick={() => logout()}
          >
            Sair
          </Dropdown.Item>

          <Dropdown.Arrow className="fill-green-700 h-2 w-3 translate-x-[-116px]" />
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};
