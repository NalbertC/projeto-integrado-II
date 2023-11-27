import React, { InputHTMLAttributes } from "react";

import { FaSearch } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onclickSerch?: React.MouseEventHandler<HTMLButtonElement>
}

export function Input({onclickSerch, type, ...props }: InputProps) {
  return (
    <div className="max-w-[384px] w-full h-[52px] relative">
      <input type={type} {...props} className="h-[52px] px-6 text-base w-full rounded-full bg-white shadow-inner border border-green-700 focus:outline-none" />

      {type === "search" &&
        <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={onclickSerch}>
          <FaSearch size={20} />
        </span>
      }
    </div>

  )
}