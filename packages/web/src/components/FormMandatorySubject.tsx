'use client'

import React, { useEffect, useState } from "react"
import { useWorkDataContext } from "@/context/contextAdmin/WorkDataStoreProvider"
import { IRequisite, ISubjects, Imessage } from "admin"//tipagem

import Alert from "./ui/Alert"


export function FormMandatorySubject() {
  //curso no contexto
  const { courseName,subjectName } = useWorkDataContext();
  
  //lista de matérias
  const [subject, setSubjects] = useState<ISubjects[]>([])
  // dados para enviar
  const [data, setData] = useState<IRequisite>({ preRequisite: '', subjectName }) // [preRequisite materias vindas do back] [nameSubject esta no contexto]

  const [msg, setMsg] = useState<Imessage>({ message: '', type: '' });


  //1° REQUISIÇÃO PARA PEGAR TODOS AS MATÉRIAS DE UM CURSO (Passar o nome do curso)
  async function getSubjects() {
    if (!courseName)
      return console.log("front front", courseName)    

    const listSubject = await fetch('/api/courseSubject/listSubject', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseName: courseName })
    })
    const sub = await listSubject.json()
    return setSubjects(sub)
  }
  useEffect(() => {
    if (courseName) {
      getSubjects();
    }
  }, [courseName]);


  //2° REQUSIÇÃO PARA ASSOCIAR A MATÉRIA DO CONTEXTO A UMA MATÉRIA (Passar o nome das duas máterias)
  async function handleRegister(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value, subjectName }
    });
  }
  async function onRegisterRequisite(event: React.SyntheticEvent) {
    event.preventDefault()
    //REQUISIÇÃO PARA O BACKEND DO NEXT PARA REGISTRA O CURSO
    const request = await fetch("/api/courseSubject/mandatorySubject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    //pegar o resultado da requisição
    const response = await request.json()
    
    if(response)
      return setMsg({
        message:response.message,
        type:response.type
    })
  }


  return (
    <>
      <form onSubmit={onRegisterRequisite} className="m-4 p-6 border rounded shadow">
        
        {subjectName === null ? (
            <label htmlFor="courseName" className="block text-sm font-alt text-gray-800">A Matéria possui algum pre-requisito para ser cursada: (Não obrigatório)</label>
        ) : (
            <label htmlFor="courseName" className="block  font-alt text-gray-800">
              A Matéria <span className=" text-purple-700 text-lg">{subjectName}</span> possui algum pre-requisito para ser cursada:
          </label>
        )
        }

       {msg.message && <Alert message={msg.message} type={msg.type} />}

        <div className="mb-4">
          <select
            name="preRequisite"
            value={data.preRequisite}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-900 bg-white-50 border rounded-md focus:border-purple-900 focus:ring-purple-600 
             focus:outline-none focus:ring focus:ring-opacity-40"
          >
            {
              Array.isArray(subject) && subject.length > 0 ? (
                subject.map((subject, index) => (
                  <option key={index}>{subject.sub_name}</option>
                ))
              ) : (
                <option value=""> carregando a lista de matérias ... </option>
              )
            }

          </select>
        </div >

        <button className="p-4 py-2 bg-gray-200 rounded-md hover:bg-purple-700">Registra Pre-requisito</button>
      </form>
    </>
  )
}