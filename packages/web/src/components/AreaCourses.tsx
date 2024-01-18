'use client'

import React, { useEffect, useState } from "react";
import { Pencil, Clock1 } from 'lucide-react';
import { ICourses, Imessage } from "admin";//tipagem curso

import FormEditCourse from "./FormEditCourse";
import ActiveDisabled from "./ui/ActiveDisabled";
import Searcher from "./ui/Search";
import Alert from "./ui/Alert";



interface ISearch {
  name: string;
}


export default function AreaCourse() {

  const [courses, setCourse] = useState<ICourses[]>([])
  const [search, setSearch] = useState<ISearch>({ name: '' });

  const [msg, setMsg] = useState<Imessage>({ message: '', type: '' });
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);


  // LISTAR OS CURSOS
  async function ListCourses() {
    const response = await fetch('/api/courseSubject/listCourse', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const dataCourse = await response.json()

    // validar se tem erro na resposta
    if (dataCourse.type === "error") {
      return setMsg({
        message: dataCourse.message,
        type: dataCourse.type
      })
    }

    return setCourse(dataCourse)
  }
  // nome recebido do search
  function handleSearchChange(value: string) {
    return setSearch({ name: value });
  };
  // filtro dos cursos na tela
  function coursesFilteredSearch() {
    // armazenar o resultado da filtragem da pesquisa para mostra (para menos renderização do react.js)
    const filteredCourses = search.name.length > 0
      ? courses.filter(course => course.cou_name.includes(search.name))
      : [];

    return filteredCourses
  }
  // quantidade de cursos
  function amountCourses() {
    const totalCourses = courses.length;
    const courseSelect = coursesFilteredSearch().length;
    return courseSelect > 0 ? `${courseSelect} Curso selecionado` : `${totalCourses} Curso`;
  }
  // receber o id do curso selecionado
  function handleEditClick(courseId: string){
    return setSelectedCourseId(prevId => (prevId === courseId ? null : courseId));
  };
  // resultado da edição do curso(vindo do componente filho form)
  function handleResultadEdit({ message, type }:Imessage){   
    return setMsg({ message, type });
  };

  useEffect(() => {
    ListCourses()
  }, [])


  return (
    <>
      <Searcher placeholder="Pesquisar por um curso" onSearchChange={handleSearchChange} />

      <div className="flex justify-between text-sm text-gray-600 mb-1 px-5">
        <span>Resultado encontrado</span>
        <span>{amountCourses()}</span>
      </div>

      {/* LISTA DE CURSOS------------------------------- */}
      <div className="m-4 my-3 p-6 rounded shadow">
        {msg.message &&
          <Alert message={msg.message} type={msg.type} />
        }

        {/*Se a pesquisa tiver uma lista maior que zero (length)*/}
        {search.name.length > 0 ? (
          //RETORNE A LISTA FILTRADA (filteredCourses)
          coursesFilteredSearch().map((course) => (
            <div key={course.id}>
              <div className="border-t-2 border-b-2 p-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-purple-700 text-2xl font-bold font-alt">{course.cou_name}</h1>
                  <span className="text-gray-900 py-2">O curso {course.cou_name} possui {course.amount} matérias associadas</span>

                  <div className="flex">
                    <span className="font-sans italic pt-1 flex text-sm">
                      <ActiveDisabled status={course.status} />
                    </span>
                    <span className="text-green-600 font-sans italic pt-1 flex items-center text-sm rounded-full">
                      <Clock1 strokeWidth={0.75} size={25} className="px-1" />
                      {course.updatedAt}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleEditClick(course.id)}
                  className="flex items-center mb-10 p-1 px-4 bg-gray-700 hover:bg-gray-200 rounded-md text-sm text-white-50 font-alt ml-auto">
                  <span className="px-2">Editar</span>
                  <Pencil strokeWidth={0.75} size={15} />
                </button>
              </div>

              {/* PEGAR NOVO NOME DO CURSO*/}
              {selectedCourseId === course.id && (
                <main className="h-24 rounded bg-gray-900">
                  <FormEditCourse courseId={selectedCourseId} props={handleResultadEdit}/>
                </main>
              )}
            </div>
          ))

        ) : (
          //RETORNE A LISTA ORIGIAL (courses)
          courses.map((course) => (
            <div key={course.id}>
              <div className="border-t-2 border-b-2 p-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-purple-700 text-2xl font-bold font-alt">{course.cou_name}</h1>
                  <span className="text-gray-900 py-2">O curso {course.cou_name} possui {course.amount} matérias associadas</span>

                  <div className="flex">
                    <span className="font-sans italic pt-1 flex text-sm">
                      <ActiveDisabled status={course.status} />
                    </span>
                    <span className="text-green-600 font-sans italic pt-1 flex items-center text-sm rounded-full">
                      <Clock1 strokeWidth={0.75} size={25} className="px-1" />
                      {course.updatedAt}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleEditClick(course.id)}
                  className="flex items-center mb-10 p-1 px-4 bg-gray-700 hover:bg-gray-200 rounded-md text-sm text-white-50 font-alt ml-auto"
                >
                  <span className="px-2">Editar</span>
                  <Pencil strokeWidth={0.75} size={15} />
                </button>
              </div>
              {/* PEGAR NOVO NOME DO CURSO*/}
              {selectedCourseId === course.id && (
                <main className="h-24 rounded bg-gray-900">
                  <FormEditCourse courseId={selectedCourseId} props={handleResultadEdit} />
                </main>
              )}
            </div>
          ))
        )}
      </div>
    </>
  )
}