import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
}

export function Button({...props }: ButtonProps) {
  return (
    <>
      <button type="button" className="h-14 rounded-full text-xl font-semibold px-8 bg-cyan-400 border border-green-700 flex items-center gap-4" {...props}/>
    </>
  )
}
