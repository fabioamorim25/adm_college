'use client'

import Link from "next/link";

import React, { useState } from "react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import Toast from "./ui/toast";


interface IUser {
  email: string;
  password: string;
}

export default function SignIn() {

  const [data, setData] = useState<IUser>({ email: "", password: "" })
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter()

  //VALIDAR O USER (enviar dados para provedor interno)
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

      const response = await signIn<"credentials">("credentials", {
        ...data,
        redirect: false
      })

      if(response && response.error) {
        if (response.error == 'CredentialsSignin') {
          setErrorMsg("O usuário não existe");
        } 
        if(response.error == 'fetch failed') {
          setErrorMsg("Error no servidor. Por favor tente mais tarde");
        }
        return null;
      }
      
      //redirecionar para home
      router.push("/")
    
  }

  //PEGAR OS DADOS DO FORMULARIO
  async function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }



  return (
    <form onSubmit={onSubmit} className="bg-white-50 py-32 px-6 mt-10 lg:mt-0 lg:w-1/3 rounded-lg shadow-md flex flex-col justify-between h-full">

      <h1 className="text-3xl font-alt text-center text-gray-700 mb-10">Logotipo</h1>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-alt text-gray-800">Digite seu Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleSubmit}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-alt text-gray-800">Digite sua Senha</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleSubmit}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <Link href="/" className="text-xs font-sans text-blue-600 hover:underline mb-4 block">
        Forget Password?
      </Link>

      <button
        className="mt-2 w-full font-sans px-4 py-2  transition-colors duration-200 transform bg-gray-200 rounded-md hover:bg-orange-900 mb-4"
      >Login
      </button>
      <Toast errorMessage={errorMsg} />
    </form>
  )
}