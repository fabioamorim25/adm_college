import React, { useState } from "react";
import { ICourses} from "admin";



interface ICourseIdProps {
  courseId: string;
  props: (res: { message: string; type: string }) => void;
}


export default function FormEditCourse({courseId,props}:ICourseIdProps) {

  const [data, setData] = useState<Partial<ICourses>>({ id:'', cou_name: '' })

  // EDITAR CURSO
  async function EditCourse(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch('/api/edit/editDataCourse', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const res = await response.json()

    setData({
      id:'', 
      cou_name: ''
    })
    return props({
      message: res.message,
      type: res.type,
    });
  }

  //PEGAR OS DADOS DO FORMULARIO
  async function handleRegister(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setData({ id:courseId , cou_name: e.target.value });
  }


  return (
    <>
      <form onSubmit={EditCourse} className="p-3">

        <div className="flex items-center">
          <div>
            <label htmlFor="name" className="block text-sm font-alt text-gray-100 mr-2">
              Digite o novo nome para o curso
            </label>

            <input
              type="text"
              name="cou_name"
              value={data.cou_name}
              onChange={handleRegister}
              className="w-96 px-3 py-1 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
              focus:outline-none focus:ring focus:ring-opacity-40 mr-2"/>
          </div>

          <button className="p-1 rounded-md bg-gray-200 hover:bg-purple-700 mt-4">
            Editar Curso
          </button>
        </div>
      </form>
    </>
  )
}