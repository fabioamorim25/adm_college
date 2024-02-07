'use client'

import React, { useEffect, useState } from "react";
import { IAssociationProps, ICourses, ISubjectCourse, Imessage } from "admin";
import { Book } from "lucide-react";

import Alert from "./ui/Alert";


interface IProps {
  subject: {
    subjectId: string,
    name: string
  };
}


export default function FormEditAssociationSubjectCourse({ subject }: IProps) {

  const [association, setAssociation] = useState<IAssociationProps[]>([])
  const [courses, setCourses] = useState<ICourses[]>([]);

  const [data, setData] = useState<ISubjectCourse>({ subjectName: subject.name, courseName: [], association: [] });
  const [msg, setMsg] = useState<Imessage>({ message: '', type: '' })


  async function getCoursesAndAssociations() {
    const listCourse = await fetch("/api/getAll/listAssociationSubject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectId: subject.subjectId })
    })
    const response = await listCourse.json();

    if (response.type === "error") {
      return setMsg({
        message: response.message,
        type: response.type
      })
    }

    const { associations, courses } = response;

    setCourses(courses);
    if (associations.length === 0) {
      return setMsg({
        message: `Não existe associações da matéria ${subject.name} com nem um cursos. Associar a um curso`,
        type: 'error'
      })
    }
    setAssociation(associations)

    return setData({
      subjectName: subject.name,
      courseName: associations.map((association: IAssociationProps) => association.course?.cou_name || ""),
      association: associations,
    });
  }

  const handleRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    return setData((prevData) => {
      if (checked) // Adiciona ao array se o checkbox estiver marcado
        return { ...prevData, courseName: [...prevData.courseName, value], association };

      // Remove do array se o checkbox estiver desmarcado
      return { ...prevData, courseName: prevData.courseName.filter((name: string) => name !== value), association };
    });
  };


  async function onRegisterAssociate(event: React.SyntheticEvent) {
    event.preventDefault()
    const response = await fetch("/api/edit/editDataSubject", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, subjectId: subject.subjectId, numberModel: 2 })
    })

    const res = await response.json()
    return setMsg({
      message: res.message,
      type: res.type
    })
  }



  useEffect(() => {
    getCoursesAndAssociations()
  }, [])



  return (
    <div>

      {msg.message &&
        <Alert message={msg.message} type={msg.type} />
      }

      <label className="text-lg text-white-50 font-alt font-bold pb-2" >
        Edite a associação da matéria
        <span className="text-purple-700 hover:text-gray-200"> {subject.name} </span>
        com o curso:
      </label>

      {courses.length === 0 ? (
        <p className="text-purple-700 hover:text-gray-200 text-lg">Lista de cursos carregando ....</p>
      ) : (
        <form onSubmit={onRegisterAssociate} className="rounded shadow">
          <div className="flex flex-wrap pt-3 pb-3 max-h-[500px] overflow-auto">
            {courses.map((course) => (
              <div key={course.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-1">
                <div className="bg-purple-700 p-3 rounded-md flex items-start">

                  <label className="text-white-50 text-lg font-bold font-alt pl-2 flex items-center">
                    <Book strokeWidth={0.75} size={25} color="#f9f6f6" />
                    <span className="text-white-50 text-lg font-bold font-alt pl-2">{course?.cou_name}</span>
                  </label>
                  <input
                    type="checkbox"
                    name='cou_name'
                    value={course.cou_name}
                    checked={data.courseName.includes(course.cou_name)}
                    onChange={handleRegister}
                    className="ml-auto mt-1"
                  />

                </div>
              </div>
            ))}
          </div>
          <button className="p-3 py-3 bg-gray-200 rounded-md hover:bg-purple-700">
            Registra Associação
          </button>
        </form>
      )}

    </div>
  )
}