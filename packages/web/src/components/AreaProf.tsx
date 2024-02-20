'use client'
import { IProfs, Imessage, ISearch, IModel } from "admin";
import React, { useEffect, useState } from "react";

import Alert from "./ui/Alert";
import Searcher from "./ui/Search";
import ActiveDisabled from "./ui/ActiveDisabled";
import ModelEditProf from "./ModelEditProf";

import { Clock1, Pencil } from "lucide-react";



export default function AreaProf() {

  const [profs, setProfs] = useState<IProfs[]>([])
  const [search, setSearch] = useState<ISearch>({ name: '' })

  const [selectedProfId, setSelectedProfId] = useState<string | null>(null)
  const [model, setModel] = useState<IModel>({ open: false, modelId: null })

  const [msg, setMsg] = useState<Imessage>({ message: '', type: '' })


  async function ListProfs() {
    const response = await fetch('/api/getAll/listInfoProfs', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    const res = await response.json()
    if (res.type === 'error')
      return setMsg({ message: res.message, type: res.type })

    return setProfs(res)
  }

  function handleSearchChange(value: string) {
    return setSearch({ name: value })
  }
  // filtro dos professores na tela
  function filteredProfSearch() {
    const filteredProfs = search.name.length > 0
      ? profs.filter(prof => prof.prof_name.includes(search.name))
      : [];

    return filteredProfs
  }
  // quantidade de professores
  function amountProfs() {
    const totalProfs = profs.length;
    const profSelect = filteredProfSearch().length;
    return profSelect > 0 ? `${profSelect} Professor selecionado` : `${totalProfs} Professor`;
  }




  useEffect(() => {
    ListProfs()
  }, [])


  function handleEditClick(profId: string) {
    return setSelectedProfId(prevId => (prevId === profId ? null : profId))
  }
  function openModal(formId: number) {
    return setModel({ open: true, modelId: formId })
  };
  function closeModal() {
    return setModel({ open: false, modelId: null })
  };

  return (
    <>
      <Searcher placeholder="Pesquisar por um professor" onSearchChange={handleSearchChange} />

      <div className="flex justify-between text-sm text-gray-600 mb-1 px-5">
        <span>Resultado encontrado</span>
        <span>{amountProfs()}</span>
      </div>

      <div className="m-4 my-3 p-6 rounded shadow">
        {msg.message &&
          <Alert message={msg.message} type={msg.type} />
        }

        {/* LISTA DE PROFESSORES------------------------------- */}
        {search.name.length > 0 ?
          (
            // RETORNE O SELECIONADO (Profs)
            filteredProfSearch().map(prof => (
              <div key={prof.id}>
                <div className="border-t-2 border-b-2 p-4 flex justify-between items-center">
                  <div className="flex flex-col">

                    <h1 className="text-purple-700 text-2xl font-bold font-alt">{prof.prof_name}</h1>
                    <span className="text-gray-900 font-bold font-alt">Existem {prof._count.Porf_Subject} matérias associadas ao professor {prof.prof_name}</span>
                    <span className="text-gray-900">Email: {prof.email}</span>
                    <span className="text-gray-900">Contato: {prof.prof_phone}</span>

                    <div className="flex">
                      <span className="font-sans italic pt-1 flex text-sm px-2">
                        <ActiveDisabled status={prof.prof_status} />
                      </span>
                      <span className="text-green-600 font-sans italic pt-1 flex items-center text-sm rounded-full">
                        <Clock1 strokeWidth={0.75} size={25} className="px-1" />
                        Registrado em {prof.createdAt}
                      </span>
                    </div>

                  </div>
                  <button
                    onClick={() => handleEditClick(prof.id)}
                    className="flex items-center mb-10 p-1 px-4 bg-gray-700 hover:bg-gray-200 rounded-md text-sm text-white-50 font-alt ml-auto"
                  >
                    <span className="px-2">Editar</span>
                    <Pencil strokeWidth={0.75} size={15} />
                  </button>
                </div>
                {/* PASSAR DADOS PARA O MODEL FORM */}
                {selectedProfId === prof.id && (
                  <main className="h-10 p-1 rounded bg-gray-900 flex items-center justify-center">

                    <button onClick={() => openModal(1)}
                      className="flex m-1 p-1 bg-gray-700 hover:bg-purple-600 rounded-md text-sm text-white-50 font-alt ">
                      Editar dados do professor
                    </button>
                    <button onClick={() => openModal(2)}
                      className="flex m-1 p-1 bg-gray-700 hover:bg-purple-600 rounded-md text-sm text-white-50 font-alt ">
                      Editar Matérias associadas
                    </button>

                    {model.open === true && (
                      <ModelEditProf prof={{ profId: selectedProfId, profName: prof.prof_name }} model={model} onClose={closeModal} />
                    )}

                  </main>
                )
                }
              </div>
            ))
          ) : (
            // RETORNE A LISTA ORIGINAL (Profs)
            profs.map(prof => (
              <div key={prof.id}>
                <div className="border-t-2 border-b-2 p-4 flex justify-between items-center">
                  <div className="flex flex-col">

                    <h1 className="text-purple-700 text-2xl font-bold font-alt">{prof.prof_name}</h1>
                    <span className="text-gray-900 font-bold font-alt">Existem {prof._count.Porf_Subject} matérias associadas ao professor {prof.prof_name}</span>
                    <span className="text-gray-900">Email: {prof.email}</span>
                    <span className="text-gray-900">Contato: {prof.prof_phone}</span>

                    <div className="flex">
                      <span className="font-sans italic pt-1 flex text-sm px-2">
                        <ActiveDisabled status={prof.prof_status} />
                      </span>
                      <span className="text-green-600 font-sans italic pt-1 flex items-center text-sm rounded-full">
                        <Clock1 strokeWidth={0.75} size={25} className="px-1" />
                        Registrado em {prof.createdAt}
                      </span>
                    </div>

                  </div>
                  <button
                    onClick={() => handleEditClick(prof.id)}
                    className="flex items-center mb-10 p-1 px-4 bg-gray-700 hover:bg-gray-200 rounded-md text-sm text-white-50 font-alt ml-auto"
                  >
                    <span className="px-2">Editar</span>
                    <Pencil strokeWidth={0.75} size={15} />
                  </button>
                </div>
                {/* PASSAR DADOS PARA O MODEL FORM */}
                {selectedProfId === prof.id && (
                  <main className="h-10 p-1 rounded bg-gray-900 flex items-center justify-center">

                    <button onClick={() => openModal(1)}
                      className="flex m-1 p-1 bg-gray-700 hover:bg-purple-600 rounded-md text-sm text-white-50 font-alt ">
                      Editar dados do professor
                    </button>
                    <button onClick={() => openModal(2)}
                      className="flex m-1 p-1 bg-gray-700 hover:bg-purple-600 rounded-md text-sm text-white-50 font-alt ">
                      Editar Matérias associadas
                    </button>

                    {model.open === true && (
                      <ModelEditProf prof={{ profId: selectedProfId, profName: prof.prof_name }} model={model} onClose={closeModal} />
                    )}
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