'use client'

import React, { useState } from "react";
import Toast from "./ui/toast";

import { useRouter } from "next/navigation";

interface IUser {
  dep_name: string;
  email: string;
  password: string;
}



export default function SignUp() {


  const [data, setData] = useState<IUser>({ dep_name: "", email: "", password: "" })
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter()

  //CADASTRA USUARIO (enviar dados para backend)
  async function onRegister(event: React.SyntheticEvent) {
    event.preventDefault()
    
    //REQUISIÇÃO PARA O BACKEND DO NEXT PARA REGISTRA O USER
    const request = await fetch("/api/authenticatedUser",{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify(data)
    })
    //pegar o resultado da requisição
    const response = await request.json()
    const {id,dep_name,email} = response
    
    //Validar a resposta
    if(!id ||!dep_name ||!email){
      setErrorMsg(response.errors ||response.msg)
      return null
    }
      
      router.push("/SignIn")

  }

  //PEGAR OS DADOS DO FORMULARIO
  async function handleRegister(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }



  return (
    <form onSubmit={onRegister} className="bg-white-50 py-32 px-6 mt-10 lg:mt-0 lg:w-1/3 rounded-lg shadow-md flex flex-col justify-between h-full">
      <h1 className="text-3xl font-alt text-center text-gray-700 mb-10">Logo</h1>

      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite o nome do Departamento</label>
        <input
          type="string"
          name="dep_name"
          value={data.dep_name}
          onChange={handleRegister}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-alt text-gray-800">Digite seu Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleRegister}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-alt text-gray-800">Digite sua Senha</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleRegister}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <button
        className="mt-2 w-full font-sans px-4 py-2  transition-colors duration-200 transform bg-gray-200 rounded-md hover:bg-orange-900 mb-4"
      >SignUp
      </button>
      
      <Toast errorMessage={errorMsg} />
    </form>
  )
}
