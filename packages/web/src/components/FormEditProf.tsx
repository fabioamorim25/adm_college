'use client'

import { IProfs, Imessage } from "admin";
import React, { useEffect, useState } from "react";
import Alert from "./ui/Alert";
interface IprofProps {
  profId: string;
}

export default function FormEditProf({ profId }: IprofProps) {

  const [data, setData] = useState<Partial<IProfs>>({ prof_name: '', email: '', prof_phone: '', prof_status: "true" })
  const [msg, setMsg] = useState<Imessage>({ message: '', type: '' })

  async function GetDataProf(profId: string) {
    const response = await fetch('/api/getAll/getProf', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profId })
    })

    const res = await response.json()
    return setData(res)
  }

  async function handleRegister(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }

  async function onEditProf(event: React.SyntheticEvent) {
    event.preventDefault()
    const response = await fetch('/api/edit/editDataProf', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, profId })
    })

    const res = await response.json();
    return setMsg({ message: res.message, type: res.type })
  }



  useEffect(() => {
    GetDataProf(profId)
  }, [])




  return (
    <div>

      {data.prof_name ? (
        <form onSubmit={onEditProf} method="POST">

          {msg.message && <Alert message={msg.message} type={msg.type} />}

          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-alt text-gray-100 mr-2">Digite o nome do professor completo</label>
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
            <label htmlFor="email" className="block text-sm font-alt text-gray-100 mr-2">Digite seu Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleRegister}
              className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
            focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-alt text-gray-100 mr-2">Digite número do telefone</label>
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
            <label className="block text-sm font-alt text-gray-100 mr-2 mb-2">O professor está ativo?</label>
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="prof_status"
                value="true"
                checked={data.prof_status === "true"}
                onChange={handleRegister}
              />
              <span className="ml-2 font-alt text-gray-100">Sim</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="prof_status"
                value="false"
                checked={data.prof_status === "false"}
                onChange={handleRegister}
              />
              <span className="ml-2 font-alt text-gray-100">Não</span>
            </label>
          </div>

          <button className="p-4 py-2 bg-gray-200 rounded-md hover:bg-purple-700"
          >Editar Professor
          </button>

        </form>
      ) : (
        <p className="text-purple-700 hover:text-gray-200 text-lg">Carregando dados do professor ....</p>
      )}

    </div>
  )
}