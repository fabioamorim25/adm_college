'use client'

import React, { useState } from "react";
import { useSession } from 'next-auth/react'

import Alert from "./ui/Alert";
import { useWorkDataContext } from "@/context/contextAdmin/WorkDataStoreProvider";



interface IProfs {
  prof_name: string
  email: string
  password: string
  prof_phone: string
  prof_status: string
  departamentId: string
}

interface Imessage{
  message: string
  type: string
}

export default function FormRegisterProf() {
  const { data: session } = useSession()
  
  const {setProfName} = useWorkDataContext()
  const [data, setData] = useState<IProfs>({prof_name: "", email: "", password: "", prof_phone: "", prof_status: "true", departamentId:""})
  const [msg, setMsg] = useState<Imessage>({message:'', type:''});
  
  
  
  //CADASTRA PROFESSOR (enviar dados para backend)
  async function onRegisterProf(event: React.SyntheticEvent) {
    event.preventDefault()
   
    //REQUISIÇÃO PARA O BACKEND DO NEXT PARA REGISTRA O PROF
    const request = await fetch("/api/registerProf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    //pegar o resultado da requisição
    const response = await request.json()
    
    //mensagem de alerta
    if (response) {
      setMsg({message: response.message,
        type: response.type
      })
      
     return setProfName(data.prof_name)
    }
  }
 
  //PEGAR OS DADOS DO FORMULARIO
  async function handleRegister(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value, departamentId: session?.user.id || '' }
    });
  }


  return (
   <>
    <form onSubmit={onRegisterProf} className="m-4 p-6 border rounded shadow">
      
      {msg.message && <Alert message={msg.message} type={msg.type} />}

      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite o nome do professor completo</label>
        <input
          type="string"
          name="prof_name"
          value={data.prof_name}
          onChange={handleRegister}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
          focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-alt text-gray-800">Digite seu Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleRegister}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
          focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-alt text-gray-800">Digite sua Senha</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleRegister}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
          focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm font-alt text-gray-800">Digite número do telefone</label>
        <input
          type="phone"
          name="prof_phone"
          value={data.prof_phone}
          onChange={handleRegister}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
          focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-alt text-gray-800">O professor está ativo?</label>
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            name="prof_status"
            value="true"
            checked={data.prof_status === "true"}
            onChange={handleRegister}
          />
          <span className="ml-2">Sim</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="prof_status"
            value="false"
            checked={data.prof_status === "false"}
            onChange={handleRegister}
          />
          <span className="ml-2">Não</span>
        </label>
      </div>

      <button  className="p-4 py-2 bg-gray-200 rounded-md hover:bg-purple-700"
      >Registra Professor
      </button>

    </form>
   </>
  )
}
