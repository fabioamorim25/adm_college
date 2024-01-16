'use client'

import React, { useEffect, useState } from "react"
import { ISubjects, Imessage, Iprof } from "admin";//tipagem

import { useWorkDataContext } from "@/context/contextAdmin/WorkDataStoreProvider"
import Alert from "./ui/Alert";


export default function FormAssociationProfSubject() {

  const { profName } = useWorkDataContext();
  const [listsub, setListSub] = useState<ISubjects[]>([])
  const [data, setData] = useState<Iprof>({ profName: null, subject: null })
  const [msg, setMsg] = useState<Imessage>({message:'', type:''});


  //LISTA DE MATÉRIAS
  async function listSubjects() {
    const response = await fetch('/api/profSubject/listSubjects', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const subjects = await response.json()
    return setListSub(subjects)
  }
  useEffect(() => {
    if (profName) {
      listSubjects()
    }
  }, [profName])

  async function handleRegister(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setData((prev) => {
      if (checked) {
        return { profName, subject: [...(prev.subject || []), name] };
      }
      else {
        return { profName, subject: (prev.subject || []).filter((item) => item !== name) };
      }
    })
  }

  //CADASTRA ASSOCIAÇÃO (enviar dados para backend)
  async function onRegisterAssociate(event: React.SyntheticEvent) {
    event.preventDefault()
    const response = await fetch('/api/profSubject/associateProfSubject',{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    const res = await response.json()
    //mensagem de alerta
    if (res) {
      return setMsg({
        message: res.message,
        type: res.type
      })
    }
  }

 
  return (
    <>
      <form onSubmit={onRegisterAssociate} className="m-4 p-6 border rounded shadow">
      {msg.message && <Alert message={msg.message} type={msg.type} />}
        <div className="mb-4">
          {profName === null ? (
            <label htmlFor="courseName" className="block text-sm font-alt text-gray-800">Associar a matéria ao professor:</label>
          ) : (
            <label htmlFor="courseName" className="block  font-alt text-gray-800">Associar matéria para o professor
              <span className=" text-purple-700 text-lg"> {profName}</span></label>
          )}
        </div>

        {listsub.map((subject, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                name={subject.sub_name}
                value={subject.sub_name}
                checked={data.subject?.includes(subject.sub_name) || false}
                onChange={handleRegister}
                className="mr-2"
              />
              {subject.sub_name}
            </label>
          </div>
        ))}

        <button type="submit" className="p-4 mt-3 py-2 bg-gray-200 rounded-md hover:bg-purple-700"
        >Registra Associação
        </button>
      </form>
    </>
  )
}