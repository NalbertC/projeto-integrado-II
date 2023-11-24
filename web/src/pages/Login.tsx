import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface LoginProps {
}

export function Login({ }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [infoLogin, setInfoLogin] = useState("");

  const { authenticated, login } = useAuth()



  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const {data} = await login(email, password);

    setInfoLogin(data)
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">

      <form className=" flex flex-col gap-2 bg-slate-100 p-4 rounded-lg" onSubmit={handleSubmit}>
        <p className="">Login</p>
        <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} />

        <p>{infoLogin}</p>

        <button className="bg-blue-500 h-10 rounded-lg">Entrar</button>
      </form>
    </div>
  )
}