import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { IconFile } from "./IconFile";

interface CardFileProps {
  fileName: string
}

export function CardFile({ fileName }: CardFileProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`relative transition hover:bg-slate-300 w-[132px] h-[158px] rounded-lg flex flex-col items-center  py-2 gap-2 ${isHovered ? 'group' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-[116px] h-[116px] rounded-[30px] flex items-center justify-center ">
        <IconFile fileName={fileName} />
      </div>

      <div
        className={`px-2 transition text-center w-full break-words truncate group-hover:overflow-visible group-hover:text-clip group-hover:whitespace-normal group-hover:z-50 group-hover:bg-slate-300 group-hover:rounded-lg`}
      >
        {fileName}
      </div>

      <div className="absolute hidden group-hover:block right-0 pr-2 pt-2 top-0 cursor-pointer">
        <FaEllipsisH size={20} />
      </div>
    </div>
  )
}