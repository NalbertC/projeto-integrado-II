import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export function Input ({...props}: InputProps) {
    return (
      <input {...props} className="h-[52px] px-6 text-base w-96 rounded-full bg-white shadow-inner border border-green-700" />

    )
}