'use client'

import React, { useEffect, useState } from "react";

import { useWorkDataContext } from "@/context/contextAdmin/WorkDataStoreProvider";
import Alert from "./ui/Alert";


interface ISubjectCourse {
  subjectName: string | null,
  courseName: string,
}

interface ICourses {
  cou_name: string
}

interface Imessage {
  message: string
  type: string
}


export default function FormAssociationSubjectCourse() {

  //dados Do contexto
  const { subjectName, setCourseName } = useWorkDataContext();

  const [courses, setCourses] = useState<ICourses[]>([]);

  const [data, setData] = useState<ISubjectCourse>({ subjectName:"", courseName: "" })

  const [msg, setMsg] = useState<Imessage>({ message: '', type: '' });


  //1° PEGAR TODOS OS NOMES DE CURSOS
  async function getCourses() {
    //REQUISIÇÃO PARA O BACKEND DO NEXT PARA LISTAR OS CURSOS
    const listCourse = await fetch("/api/courseSubject/listCourse", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const course = await listCourse.json();

    if (course.type === "error")
      return setMsg({
        message: course.message,
        type: course.type
      })

    return setCourses(course);
  }

  useEffect(() => {
    getCourses()
  }, []);

 

   
  //2°PEGAR OS DADOS DO FORMULARIO
  async function handleRegister(e: React.ChangeEvent<HTMLSelectElement>) { 
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value, subjectName }
    });
  }

  //3°CADASTRA ASSOCIAÇÃO (enviar dados para backend)
  async function onRegisterAssociate(event: React.SyntheticEvent) {
    event.preventDefault()
    if(!data.subjectName){   
         return setMsg({
            message: 'Precisa criar uma máteria',
            type: 'erro'
          })
    }
     //REQUISIÇÃO PARA O BACKEND DO NEXT PARA REGISTRA O CURSO
     const request = await fetch("/api/courseSubject/associateSubjectCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    //pegar o resultado da requisição
    const response = await request.json()
    setCourseName(
      data.courseName
    )
  
     //mensagem de alerta
    if (response) {
      return setMsg({
        message: response.message,
        type: response.type
      })
    }   
  }


  return (
    <>
      <form onSubmit={onRegisterAssociate} className="m-4 p-6 border rounded shadow">
        {msg.message && <Alert message={msg.message} type={msg.type} />}
       
        <div className="mb-4">
          {subjectName === null ? (
              <label htmlFor="courseName" className="block text-sm font-alt text-gray-800">Associar a máteria a um curso:</label>
            ) : (
              <label htmlFor="courseName" className="block  font-alt text-gray-800">Associar a máteria
                <span className=" text-purple-700 text-lg"> {subjectName}</span>para um curso:</label>
            )
          }

          <select
            name="courseName"
            value={data.courseName}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-900 bg-white-50 border rounded-md focus:border-purple-900 focus:ring-purple-600 
              focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="">Selecione um curso da lista</option>
            {Array.isArray(courses) && courses.length > 0 ? (
                courses.map((course, index) => (
                  <option key={index}>{course.cou_name}</option>
                ))
            ) : (
                <option value=""> carregando a lista de cursos ... </option>
            )}
          </select>
        </div>

        <button className="p-4 py-2 bg-gray-200 rounded-md hover:bg-purple-700">Registra Máteria</button>
      </form>
    </>
  )
}
