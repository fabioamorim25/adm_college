'use client'

import React, { useEffect, useState } from "react"
import { RefreshCcw } from 'lucide-react'
import Alert from "./ui/Alert"
import { useWorkDataContext } from "@/context/contextAdmin/WorkDataStoreProvider"


interface IStudent {
  stu_name: string
  stu_registration: string
  stu_status: string
  stu_period: string
  stu_mother_name: string
  stu_father_name: string
  stu_phone: string
  email: string
  password: string
  courseName: string
}
interface ICourses {
  cou_name: string
}
interface Imessage {
  message: string
  type: string
}



function generateRegistration() {
  const year = new Date().getFullYear().toString().slice(-4); // Pega os últimos 4 dígitos do ano atual
  const numberRandom = Math.floor(Math.random() * 100000).toString().padStart(5, '0'); // Gera dois dígitos aleatórios
  return year + numberRandom;
}


export default function FormRegisterStudent() {

  const [courses, setCourses] = useState<ICourses[]>([]);
  const [data, setData] = useState<IStudent>({ stu_name: "", stu_registration: generateRegistration(), stu_status: "true", stu_period: "1", stu_mother_name: "", stu_father_name: "", stu_phone: "", email: "", password: "", courseName: "" })
  const [msg, setMsg] = useState<Imessage>({ message: '', type: '' });
  const { setStudentName } = useWorkDataContext()

  // LISTAR CURSOS
  async function getCourses() {
    //REQUISIÇÃO PARA O BACKEND DO NEXT PARA LISTAR OS CURSOS
    const listCourse = await fetch("/api/courseSubject/listCourse", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const course = await listCourse.json();
    if (course.type === "error") {
      // return setMsg({
      //   message: course.message,
      //   type: course.type
      // })
      return console.log(course)
    }
    return setCourses(course);
  }
  useEffect(() => {
    getCourses()
  }, []);



  //PEGAR OS DADOS DO FORMULARIO
  async function handleRegister(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }
  // ENVIAR DADOS
  async function onRegisterStudent(event: React.SyntheticEvent) {
    event.preventDefault()
    const request = await fetch('/api/registerStudent', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    const response = await request.json()
    if (response) {
      setMsg(response)
      setStudentName(data.stu_name)
      return setData({
        stu_name: "", stu_registration: generateRegistration(), stu_status: "true", stu_period: "1",
        stu_mother_name: "", stu_father_name: "", stu_phone: "", email: "", password: "", courseName: ""
      })
    }
  }


  return (
    <>
      <form onSubmit={onRegisterStudent} className="m-4 p-6 border rounded shadow">

        {msg.message && <Alert message={msg.message} type={msg.type} />}

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite o nome do aluno completo</label>
          <input
            type="string"
            name="stu_name"
            value={data.stu_name}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
          focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mb-6 flex">
          <div className="flex-grow">
            <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite a matricula do aluno</label>
            <input
              type="string"
              name="stu_registration"
              value={data.stu_registration}
              onChange={handleRegister}
              className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
                  focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <button
            onClick={() => setData(prev => ({ ...prev, stu_registration: generateRegistration() }))}
            type="button"
            className="bg-purple-900 rounded hover:bg-purple-600 mt-8 ml-1 h-9 w-9 flex items-center justify-center"
          >
            <RefreshCcw color="white" size={16} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-alt text-gray-800">O aluno está ativo?</label>
          <label className="inline-flex items-center mr-6">
            <input
              type="radio"
              name="stu_status"
              value="true"
              checked={data.stu_status === "true"}
              onChange={handleRegister}
            />
            <span className="ml-2">Sim</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="stu_status"
              value="false"
              checked={data.stu_status === "false"}
              onChange={handleRegister}
            />
            <span className="ml-2">Não</span>
          </label>
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite periodo do aluno</label>
          <input
            type="string"
            name="stu_period"
            value={data.stu_period}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
          focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite o nome da mãe</label>
          <input
            type="string"
            name="stu_father_name"
            value={data.stu_father_name}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
          focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-alt text-gray-800">Digite o nome do pai</label>
          <input
            type="string"
            name="stu_mother_name"
            value={data.stu_mother_name}
            onChange={handleRegister}
            className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
          focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-alt text-gray-800">Digite número do telefone</label>
          <input
            type="phone"
            name="stu_phone"
            value={data.stu_phone}
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

        <select
          name="courseName"
          value={data.courseName}
          onChange={handleRegister}
          className="w-full px-3 py-2 pb-3 mt-2 text-gray-900 bg-white-50 border rounded-md focus:border-purple-900 focus:ring-purple-600 
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

        <button className="p-4 py-2 bg-gray-200 rounded-md hover:bg-purple-700">Registra aluno</button>
      </form>
    </>
  )
}