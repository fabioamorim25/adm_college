"use client"

import React, { useEffect, useState } from "react";
import { ISubjects, Imessage } from "admin";
import Alert from "./ui/Alert";


interface IProps {
  subjectId: string;
}

export default function FormEditSubject({ subjectId }: IProps) {

  const [data, setData] = useState<Partial<ISubjects>>({ sub_name: "", sub_shift: "", sub_start_time: "", sub_stop_time: "", sub_description: "", sub_mandatory: "true" })
  const [msg, setMsg] = useState<Imessage>({ message: "", type: "" })

  async function subject(subjectId: string) {
    const request = await fetch('/api/getAll/getSubject', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subjectId)
    })

    const res = await request.json();
    if (res.type === 'error') {
      return setMsg({
        message: res.message,
        type: res.type,
      })
    }

    return setData({
      sub_name: res.sub_name,
      sub_description: res.sub_description,
      sub_shift: res.sub_shift,
      sub_start_time: res.sub_start_time,
      sub_stop_time: res.sub_stop_time,
      sub_mandatory: res.sub_mandatory,
    })
  }

  function handleData(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }

  async function onUpdateSubject(event: React.SyntheticEvent) {
    await fetch("/api/edit/editDataSubject", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, subjectId, numberModel: 1 })
    })
    return
  }


  useEffect(() => {
    subject(subjectId)
  }, [])


  return (
    <>
      <form onSubmit={onUpdateSubject}>

        {msg.message && <Alert message={msg.message} type={msg.type} />}

        <div>
          <label htmlFor="name" className="block text-sm font-alt text-gray-50">Digite o nome para da máteria</label>
          <input
            type="text"
            name="sub_name"
            value={data.sub_name}
            onChange={handleData}
            className="w-full px-3 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600 
          focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mt-2">
          <label htmlFor="sub_description" className="block text-sm font-alt text-gray-50">Digite uma descrição para a matéria</label>
          <textarea
            name="sub_description"
            value={data.sub_description}
            onChange={handleData}
            className="w-full px-1 py-1 mt-2 text-gray-900 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600 
          focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-1 mt-2">
          <label className="block text-sm font-alt text-gray-50">Definir o Periodo da Aula:</label>
          <div className="mt-2 flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sub_shift"
                value="Manhã"
                checked={data.sub_shift === 'Manhã'}
                onChange={handleData}
                className="text-purple-600 form-radio"
              />
              <span className="ml-2 text-gray-50">Manhã</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sub_shift"
                value="Tarde"
                checked={data.sub_shift === 'Tarde'}
                onChange={handleData}
                className="text-purple-600 form-radio"
              />
              <span className="ml-2 text-gray-50">Tarde</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sub_shift"
                value="Noite"
                checked={data.sub_shift === 'Noite'}
                onChange={handleData}
                className="text-purple-600 form-radio"
              />
              <span className="ml-2 text-gray-50">Noite</span>
            </label>
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="sub_start_time" className="block text-sm font-alt text-gray-50 mb-2">Definir data do semestre letivo: (de 3 a 6 meses)</label>
          <div className="p-6 border rounded shadow flex flex-col sm:flex-row">
            <div className="mb-4 w-full sm:w-1/2 pr-2">
              <label htmlFor="sub_start_time" className="block text-sm font-alt text-gray-50">Data e Hora de Início:</label>
              <input
                type="datetime-local"
                name="sub_start_time"
                value={data.sub_start_time}
                onChange={handleData}
                className="w-full px-3 py-2 mt-2 text-gray-900 bg-white-50 border rounded-md focus:border-purple-900 focus:ring-purple-600 
               focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-4 w-full sm:w-1/2 pl-2">
              <label htmlFor="sub_stop_time" className="block text-sm font-alt text-gray-50">Data e Hora de Término:</label>
              <input
                type="datetime-local"
                name="sub_stop_time"
                value={data.sub_stop_time}
                onChange={handleData}
                className="w-full px-3 py-2 mt-2 text-gray-900 bg-white-50 border rounded-md focus:border-purple-900 focus:ring-purple-600
              focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
        </div>
        <div className="mb-2 mt-6">
          <label className="block text-gray-50 text-sm font-bold mb-2">A matéria é obrigatória?</label>
          <div className="mt-2">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="sub_mandatory"
                value={data.sub_mandatory}
                checked={data.sub_mandatory === 'true'}
                onChange={handleData}
                className="text-purple-600 form-radio"
              />
              <span className="ml-2 text-gray-50">Sim</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sub_mandatory"
                value={data.sub_mandatory}
                checked={data.sub_mandatory === 'false'}
                onChange={handleData}
                className="text-purple-600 form-radio"
              />
              <span className="ml-2 text-gray-50">Não</span>
            </label>
          </div>
        </div>

        <button className="p-3 mt-3 bg-gray-700 hover:bg-purple-600 rounded-md text-sm text-white-50 font-alt"
        >Editar Matéria
        </button>
      </form>
    </>
  )
}