import React, { useEffect, useState } from "react";
import { IRequiredProps, IRequisite, ISubjects, Imessage } from "admin";

import { Book } from "lucide-react";
import Alert from "./ui/Alert";

interface IMandatoryProps {
  subject: {
    subjectId: string,
    name: string
  };
}

export default function FormEditMandatorySubject({ subject }: IMandatoryProps) {

  const [subjects, setSubjects] = useState<ISubjects[]>([]);
  const [required, setRequired] = useState<IRequiredProps[]>([]);

  const [data, setData] = useState<IRequisite>({ subjectName: subject.name, preRequisite: [], requireds: [] });
  const [msg, setMsg] = useState<Imessage>({ message: "", type: "" })



  async function ListSubjectAndRequirements() {
    const response = await fetch('/api/getAll/listSubjectAndRequirements', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectName: data.subjectName })
    })

    const res = await response.json();

    if (res.type === 'error') {
      return setMsg({ message: res.message, type: res.type });
    }

    const { Requirements, subjects } = res;

    setSubjects(subjects);

    if (Requirements.length === 0) {
      return setMsg({
        message: `Não existe pré-requisito da matéria ${subject.name}. Registre um pré-requisito.`,
        type: 'error'
      });
    }

    const preRequisites = Requirements.map((req: { preRequisite: string }) => req.preRequisite);

    setRequired(preRequisites);

    return setData({
      subjectName: subject.name,
      preRequisite: preRequisites,
      requireds: Requirements
    });
  }

  async function handleRegister(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;

    return setData((prevData) => {
      if (checked) {
        // Adiciona o pré-requisito à lista se estiver marcado
        return { ...prevData, preRequisite: [...prevData.preRequisite, value] };
      } else {
        // Remove o pré-requisito da lista se estiver desmarcado
        return { ...prevData, preRequisite: prevData.preRequisite.filter((name: string) => name !== value) };
      }
    });
  };

  async function SaveRequirementUpdate(event: React.SyntheticEvent) {
    event.preventDefault()
    const response = await fetch("/api/edit/editDataSubject", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, subjectId: subject.subjectId, numberModel: 3 })
    })

    const res = await response.json()
    
    return setMsg({ message: res.message, type: res.type });
  }

  useEffect(() => {
    ListSubjectAndRequirements()
  }, [])



  return (
    <>
      {msg.message &&
        <Alert message={msg.message} type={msg.type} />
      }

      <label className="text-lg text-white-50 font-alt font-bold pb-2" >
        Edite a matéria pré-requisito para cursar a matéria
        <span className="text-purple-700 hover:text-gray-200"> {subject.name} </span>
      </label>

      {subjects.length === 0 ? (
        <p className="text-purple-700 hover:text-gray-200 text-lg">Lista de matérias carregando ....</p>
      ) : (
        <form onSubmit={SaveRequirementUpdate} className="rounded shadow">

          <div className="flex flex-wrap pt-3 pb-3 max-h-[500px] overflow-auto">
            {
              subjects.map(sub => (
                <div key={sub.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-1">
                  <div className="bg-purple-700 p-3 rounded-md flex items-start">

                    <label className="text-white-50 text-lg font-bold font-alt pl-2 flex items-center">
                      <Book strokeWidth={0.75} size={25} color="#f9f6f6" />
                      <span className="text-white-50 text-lg font-bold font-alt pl-2">{sub.sub_name}</span>
                    </label>
                    <input
                      type="checkbox"
                      name="sub_name"
                      value={sub.sub_name}
                      checked={data.preRequisite.includes(sub.sub_name)}
                      onChange={handleRegister}
                      className="ml-auto mt-1"
                    />
                  </div>
                </div>
              ))
            }
          </div>

          <button className="p-3 py-3 bg-gray-200 rounded-md hover:bg-purple-700">
            Registra
          </button>
        </form>
      )
      }
    </>
  )
}