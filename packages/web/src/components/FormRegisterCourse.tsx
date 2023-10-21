'use client'

import React, { useState } from "react";
import Alert from "./ui/Alert";
import { useRouter } from "next/navigation";


interface ICourses {
  cou_name: string
}

interface Imessage {
  message: string
  type: string
}


export default function FormRegisterCourse() {

  const [data, setData] = useState<ICourses>({ cou_name: "" })

  const [msg, setMsg] = useState<Imessage>({ message: '', type: '' });

  const router = useRouter()
  
  //PEGAR OS DADOS DO FORMULARIO
  async function handleRegister(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }


  //CADASTRA CURSO (enviar dados para backend)
  async function onRegisterCourse(event: React.SyntheticEvent) {
    event.preventDefault()
    //REQUISIÇÃO PARA O BACKEND DO NEXT PARA REGISTRA O CURSO
    const request = await fetch("/api/registerCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    //pegar o resultado da requisição
    const response = await request.json()

    //mensagem de alerta
    setMsg({
      message: response.message,
      type: response.type
    })
    
    if(response.type === 'success')     
      return router.push('/admin/registerSubjects')
  }


  return (
    <form onSubmit={onRegisterCourse} className="m-4 p-6 border rounded shadow">
      {msg.message && <Alert message={msg.message} type={msg.type} />}
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite o nome para o curso</label>
        <input
          type="string"
          name="cou_name"
          value={data.cou_name}
          onChange={handleRegister}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white-50 border rounded-md focus:border-purple-900 focus:ring-purple-600
          focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <button className="p-4 py-2 bg-gray-200 rounded-md hover:bg-purple-700"
      >Registra Curso
      </button>

    </form>
  )
}