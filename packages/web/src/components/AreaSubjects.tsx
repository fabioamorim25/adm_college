'use client'

import React, { useEffect, useState } from "react";
import { ISubjects, Imessage } from "admin";

import Searcher from "./ui/Search";
import Alert from "./ui/Alert";
import ActiveDisabled from "./ui/ActiveDisabled";
import { Clock1, Pencil } from "lucide-react";
import FormEditSubject from "./FormEditSubject";


interface ISearch {
  name: string;
}


export default function AreaSubjects() {

  const [search, setSearch] = useState<ISearch>({ name: '' })
  const [subjects, setSubject] = useState<ISubjects[]>([])

  const [msg, setMsg] = useState<Imessage>({ message: '', type: '' })
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)

  // nome recebido do search
  function handleSearchChange(value: string) {
    return setSearch({ name: value });
  };
  // filtro das matérias na tela
  function subjectFilteredSearch() {
    // armazenar o resultado da filtragem da pesquisa para mostra (para menos renderização do react.js)
    const filteredSubject = search.name.length > 0
      ? subjects.filter(subject => subject.sub_name.includes(search.name))
      : [];

    return filteredSubject
  }
  // quantidade de matérias
  function amountSubjects() {
    const totalSubjects = subjects.length;
    const subjectSelect = subjectFilteredSearch().length;
    return subjectSelect > 0 ? `${subjectSelect} Matéria selecionado` : `${totalSubjects} Matéria`;
  }

  async function ListSubject() {
    const response = await fetch('/api/getAll/listInfoSubjects', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    const res = await response.json();

    if (res.type === 'error') {
      return setMsg({
        message: res.message,
        type: res.type,
      })
    }
    return setSubject(res)
  }


  //FORM FILHO: receber o id da matéria selecionada
  function handleEditClick(subjectId: string) {
    return setSelectedSubjectId(prevId => (prevId === subjectId ? null : subjectId));
  };
  //FORM FILHO: resultado da edição da matéria (vindo do componente filho form)
  function handleResultadEdit({ message, type }: Imessage) {
    return setMsg({ message, type });
  };



  useEffect(() => {
    ListSubject()
  }, [])



  return (
    <>
      <Searcher placeholder="Pesquisar por um matéria" onSearchChange={handleSearchChange} />

      <div className="flex justify-between text-sm text-gray-600 mb-1 px-5">
        <span>Resultado encontrado</span>
        <span>{amountSubjects()}</span>
      </div>


      {/* LISTA DE MATÉRIAS-------------------- */}
      <div className="m-4 my-3 p-6 rounded shadow">

        {msg.message &&
          <Alert message={msg.message} type={msg.type} />
        }


        {search.name.length > 0 ? (
          // RETORNE A LISTA FILTRADA
          subjectFilteredSearch().map((subject) => (

            <div key={subject.id}>

              <div className="border-t-2 border-b-2 p-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-purple-700 text-2xl font-bold font-alt">{subject.sub_name}</h1>
                  <span className="text-gray-900 py-2">{subject.sub_description}</span>
                  <span className="text-gray-900">A matéria {subject.sub_name} possui {subject.amount} curso associado</span>
                  <span className="text-gray-900">Periodo {subject.sub_shift} as {subject.sub_start_time} até {subject.sub_stop_time}</span>

                  <div className="flex py-1">
                    <span className="font-sans italic pt-1 flex text-sm">
                      <ActiveDisabled status={subject.status} />
                    </span>
                    <span className="text-green-700 font-sans italic pt-1 flex items-center text-sm rounded-full">
                      <Clock1 strokeWidth={0.75} size={25} className="p-1" />
                      <p>Ultima atualização:</p>
                      <p className="px-1">{subject.updatedAt}</p>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleEditClick(subject.id)}
                  className="flex items-center mb-10 p-1 px-4 bg-gray-700 hover:bg-gray-200 rounded-md text-sm text-white-50 font-alt ml-auto"
                >
                  <span className="px-2">Editar</span>
                  <Pencil strokeWidth={0.75} size={15} />
                </button>
              </div>
              {/* PEGAR NOVO NOME DA MATÉRIA*/}
              {selectedSubjectId === subject.id && (
                <main className="h-24 rounded bg-gray-900">
                  <FormEditSubject subjectId={selectedSubjectId} props={handleResultadEdit} />
                </main>
              )}
            </div>
          ))

        ) : (

          // RETORNE A LISTA COMPLETA
          subjects.map((subject) => (
            <div key={subject.id}>

              <div className="border-t-2 border-b-2 p-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-purple-700 text-2xl font-bold font-alt">{subject.sub_name}</h1>
                  <span className="text-gray-900 py-2">{subject.sub_description}</span>
                  <span className="text-gray-900">A matéria {subject.sub_name} possui {subject.amount} curso associado</span>
                  <span className="text-gray-900">Periodo {subject.sub_shift} as {subject.sub_start_time} até {subject.sub_stop_time}</span>

                  <div className="flex py-1">
                    <span className="font-sans italic pt-1 flex text-sm">
                      <ActiveDisabled status={subject.status} />
                    </span>
                    <span className="text-green-700 font-sans italic pt-1 flex items-center text-sm rounded-full">
                      <Clock1 strokeWidth={0.75} size={25} className="p-1" />
                      <p>Ultima atualização:</p>
                      <p className="px-1">{subject.updatedAt}</p>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleEditClick(subject.id)}
                  className="flex items-center mb-10 p-1 px-4 bg-gray-700 hover:bg-gray-200 rounded-md text-sm text-white-50 font-alt ml-auto"
                >
                  <span className="px-2">Editar</span>
                  <Pencil strokeWidth={0.75} size={15} />
                </button>
              </div>

              {/* PEGAR NOVO NOME DA MATÉRIA*/}
              {selectedSubjectId === subject.id && (
                <main className="h-24 rounded bg-gray-900">
                  <FormEditSubject subjectId={selectedSubjectId} props={handleResultadEdit} />
                </main>
              )}
            </div>
          ))
        )
        }
      </div>
    </>
  )
}