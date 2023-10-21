'use client'

import React, { useState } from "react";
import Alert from "./ui/Alert";
import { useWorkDataContext } from "@/context/contextAdmin/WorkDataStoreProvider";




interface ISubjects {
  sub_name: string,
  sub_shift: string,
  sub_start_time: string,
  sub_stop_time: string,
  sub_description: string,
  sub_mandatory: string
  sub_day: string
}

interface Imessage {
  message: string
  type: string
}


export default function FormRegisterSubject() {

  const [data, setData] = useState<ISubjects>({ sub_name: "", sub_shift: "", sub_start_time: "", sub_stop_time: "", sub_description: "", sub_mandatory: "true", sub_day: "" })

  const [msg, setMsg] = useState<Imessage>({ message: '', type: '' });

  const { setSubjectName } = useWorkDataContext();

  //PEGAR OS DADOS DO FORMULARIO
  async function handleRegister(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }


  //CADASTRA MATERIA (enviar dados para backend)
  async function onRegisterSubject(event: React.SyntheticEvent) {
    event.preventDefault()
    //REQUISIÇÃO PARA O BACKEND DO NEXT PARA REGISTRA O CURSO
    const request = await fetch("/api/registerSubject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    //pegar o resultado da requisição
    const response = await request.json()

    //mensagem de alerta
    if (response) {
      setMsg({
        message: response.message,
        type: response.type
      })
      // máteria para o contexto
      if (response.type == 'success'){
        setSubjectName({
          subjectName: data.sub_name
        })
        setData({
          sub_name: "",
          sub_shift: "",
          sub_start_time: "",
          sub_stop_time: "",
          sub_description: "",
          sub_mandatory: "true",
          sub_day: ""
        })
      }
       return   
    }
  }


  return (
    <>
      <form onSubmit={onRegisterSubject} className="m-4 p-6 border rounded shadow">
        {msg.message && <Alert message={msg.message} type={msg.type} />}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite o nome para da máteria</label>
          <input
            type="name"
            name="sub_name"
            value={data.sub_name}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600 
          focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>


        <div className="mb-6">
          <label htmlFor="sub_description" className="block text-sm font-alt text-gray-800">Digite uma descrição para a matéria</label>
          <textarea
            name="sub_description"
            value={data.sub_description}
            onChange={handleRegister}
            className="w-full px-1 py-1 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600 
          focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>


        <div className="mb-6 mt-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Definir o Periodo da Aula:</label>
          <div className="mt-2 flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sub_shift"
                value="Manhã"
                checked={data.sub_shift === 'Manhã'}
                onChange={handleRegister}
                className="text-purple-600 form-radio"
              />
              <span className="ml-2 text-gray-700">Manhã</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sub_shift"
                value="Tarde"
                checked={data.sub_shift === 'Tarde'}
                onChange={handleRegister}
                className="text-purple-600 form-radio"
              />
              <span className="ml-2 text-gray-700">Tarde</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sub_shift"
                value="Noite"
                checked={data.sub_shift === 'Noite'}
                onChange={handleRegister}
                className="text-purple-600 form-radio"
              />
              <span className="ml-2 text-gray-700">Noite</span>
            </label>
          </div>
        </div>


        <div className="mb-4">
          <label htmlFor="sub_day" className="block text-sm font-alt text-gray-800">Definir o dia da semana da matéria:</label>
          <select
            name="sub_day"
            value={data.sub_day}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-900 bg-white-50 border rounded-md focus:border-purple-900 focus:ring-purple-600 
            focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="">Selecione um dia</option>
            <option value="Domingo">Domingo</option>
            <option value="Segunda-feira">Segunda-feira</option>
            <option value="Terça-feira">Terça-feira</option>
            <option value="Quarta-feira">Quarta-feira</option>
            <option value="Quinta-feira">Quinta-feira</option>
            <option value="Sexta-feira">Sexta-feira</option>
            <option value="Sábado">Sábado</option>
          </select>
        </div>


        <div>
          <label htmlFor="sub_start_time" className="block text-sm font-alt text-gray-800">Definir data do semestre letivo: (de 3 a 6 meses)</label>
          <div className="p-6 border rounded shadow flex flex-col sm:flex-row">
            <div className="mb-4 w-full sm:w-1/2 pr-2">
              <label htmlFor="sub_start_time" className="block text-sm font-alt text-gray-800">Data e Hora de Início:</label>
              <input
                type="datetime-local"
                name="sub_start_time"
                value={data.sub_start_time}
                onChange={handleRegister}
                className="w-full px-3 py-2 mt-2 text-gray-900 bg-white-50 border rounded-md focus:border-purple-900 focus:ring-purple-600 
               focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-4 w-full sm:w-1/2 pl-2">
              <label htmlFor="sub_stop_time" className="block text-sm font-alt text-gray-800">Data e Hora de Término:</label>
              <input
                type="datetime-local"
                name="sub_stop_time"
                value={data.sub_stop_time}
                onChange={handleRegister}
                className="w-full px-3 py-2 mt-2 text-gray-900 bg-white-50 border rounded-md focus:border-purple-900 focus:ring-purple-600
              focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
        </div>


        <div className="mb-6 mt-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">A matéria é obrigatória?</label>
          <div className="mt-2">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="sub_mandatory"
                value="true"
                checked={data.sub_mandatory === 'true'}
                onChange={handleRegister}
                className="text-purple-600 form-radio"
              />
              <span className="ml-2 text-gray-700">Sim</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sub_mandatory"
                value="false"
                checked={data.sub_mandatory === 'false'}
                onChange={handleRegister}
                className="text-purple-600 form-radio"
              />
              <span className="ml-2 text-gray-700">Não</span>
            </label>
          </div>
        </div>


        <button className="p-4 py-2 bg-gray-200 rounded-md hover:bg-purple-700"
        >Registra Máteria
        </button>

      </form>
    </>
  )
}


