'use client'

import React, { useState } from "react";

import { useWorkDataContext } from "@/context/contextAdmin/WorkDataStoreProvider"
import Alert from "./ui/Alert";

interface IAddress {
  add_street: string,
  add_city: string,
  add_neighborhood: string,
  add_number: string,
  add_complement: string,
  studentName: string | null,
}
interface Imessage{
  message: string|null,
  type: string,
}

export default function FormRegisterAddress() {
  const { studentName } = useWorkDataContext()
  const [data, setData] = useState<IAddress>({ add_street: "", add_city: "", add_neighborhood: "", add_number: "", add_complement: "", studentName: null })
  const [msg, setMsg] = useState<Imessage>({message:null, type:""})

  //PEGAR OS DADOS DO FORMULARIO
  async function handleRegister(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value, studentName }
    });
  }

  //REQUISIÇÃO PARA O BACKEND DO NEXT
  async function onRegisterAddress(event: React.SyntheticEvent) {
    event.preventDefault()

    if (!data.studentName){
       return setMsg({
          message:'Cadastre um aluno primeiro',
          type:'error'
        })
    }

    const request = await fetch('/api/registerAddress', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    const response = await request.json()
    if(response){
      setMsg({
        message: response.message,
        type: response.type
      })
    }

    return setData({
      add_street: "", 
      add_city: "",
      add_neighborhood: "",
      add_number: "",
      add_complement: "",
      studentName: null
    })
  }


  return (
    <>
      <form onSubmit={onRegisterAddress} className="m-4 p-6 border rounded shadow">

        {msg.message && <Alert message={msg.message} type={msg.type} />}

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite o nome da rua</label>
          <input
            type="string"
            name="add_street"
            value={data.add_street}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
  focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite o nome da cidade</label>
          <input
            type="string"
            name="add_city"
            value={data.add_city}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
  focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite o nome da cidade</label>
          <input
            type="string"
            name="add_neighborhood"
            value={data.add_neighborhood}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
  focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="number" className="block text-sm font-alt text-gray-800">Digite número da casa</label>
          <input
            type="string"
            name="add_number"
            value={data.add_number}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
  focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="sub_description" className="block text-sm font-alt text-gray-800">Digite um complemento (opcional)</label>
          <textarea
            name="add_complement"
            value={data.add_complement}
            onChange={handleRegister}
            className="w-full px-1 py-1 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600 
          focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <button className="p-4 py-2 bg-gray-200 rounded-md hover:bg-purple-700">Registra Endereço</button>
      </form>

    </>
  )
}