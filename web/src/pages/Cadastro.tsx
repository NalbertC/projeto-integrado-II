import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function Cadastro() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [infoLogin, setInfoLogin] = useState("");
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (email === "" || name === "" || username === "" || password === "") {
      setInfoLogin("Todos os campos devem ser preenchidos")
      return
    }


    try {
      console.log({ name, email, username, password })
      await api.post("/users/user", { name, username, email, password })

      navigate("/login")
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setInfoLogin(error.response.data)
        }
        console.error(error);

      }
    }








  }


  return (
    <div className="h-screen w-full flex flex-row gap-6 justify-around items-center bg-gradient-to-b from-indigo-500 to-white px-6">
      <aside className="flex flex-col gap-8">
        <h1 className="text-black text-[58px] font-bold">Bem vindo(a) ao <br />LocalDrive</h1>

        <p className="text-[32px]">Seu local de armazenamento on-line!</p>

        <div className="flex flex-row gap-4 items-center">
          <span>Já possui cadastro?</span>

          <button className="w-56 h-[62px] bg-cyan-400 rounded-full shadow border border-white text-xl font-bold" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </aside>

      <form className=" flex flex-col bg-slate-100 py-9 px-12 bg-gradient-to-b from-cyan-400 to-cyan-400/5 rounded-[32px] shadow border border-green-700" onSubmit={handleSubmit} >
        <header className="font-bold flex justify-center text-[32px]  pb-6">
          <p className="">Criar nova conta</p>
        </header>

        <main className="flex flex-col gap-3">
          <label htmlFor="email" className="flex flex-col gap-1">
            <span className="font-semibold text-xl px-4">Nome</span>
            <Input type="text" placeholder="Digite seu nome completo" value={name} onChange={e => setName(e.target.value)} />
          </label>

          <label htmlFor="" className="flex flex-col">

            <span className="font-semibold text-xl px-4">Email</span>

            <Input type="email" placeholder="Digite seu e-mail" value={email} onChange={e => setEmail(e.target.value)} />

          </label>

          <label htmlFor="" className="flex flex-col">

            <span className="font-semibold text-xl px-4">Username</span>

            <Input type="text" placeholder="Digite um nome de usuário" value={username} onChange={e => setUsername(e.target.value)} />

          </label>
          <label htmlFor="" className="flex flex-col">

            <span className="font-semibold text-xl px-4">Senha</span>
            <Input type="password" placeholder="Digite uma senha" value={password} onChange={e => setPassword(e.target.value)} />


          </label>
        </main>

        <span className="h-10 flex items-center justify-center text-red-400">
          <p>{infoLogin}</p>
        </span>

        <footer className="flex flex-col items-center gap-3">
          <button type="submit" className=" h-14 rounded-full text-xl font-semibold w-full bg-green-500  border border-white">Criar</button>
        </footer>
      </form>
    </div>
  )
}