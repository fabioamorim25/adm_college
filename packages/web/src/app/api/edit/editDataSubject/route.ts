import { NextRequest, NextResponse } from "next/server";
import { IAssociationProps } from "admin";

import { getServerSession } from 'next-auth';
import { nextAuthOptions } from "../../auth/[...nextauth]/options";


interface IDataProps {
  sub_name: string;
  sub_shift: string;
  sub_start_time: string;
  sub_stop_time: string;
  sub_description: string;
  sub_mandatory: string;

  subjectName: string;
  courseName: string[];
  association: IAssociationProps[];
}


export async function PUT(request: NextRequest) {

  const { subjectId, numberModel, data } = await request.json();
  const session = await getServerSession(nextAuthOptions);
  const token = session?.token;
  const departamentId = session?.user.id


  if (!subjectId || !numberModel || !token || !departamentId) {
    return NextResponse.json({ message: "MetaDatas invalidos", type: "error" }, { status: 400 })
  }

  async function filterDataNecessary(numberModel: number, data: IDataProps) {
    if (numberModel == 1) {
      const { sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory } = data;
      return { sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory };
    }
    if (numberModel === 2) {
      const { subjectName, courseName, association } = data;

      const courseNameSet = new Set(courseName);

      // Retorna um array com os dados que se repetem association e courseName
      const duplicateItems = association.filter(course =>
        courseNameSet.has(course.course.cou_name)
      );

      // Retorna um array com os dados que não se repetem [DOCUMENTO A CRIAR]
      const nonDuplicateItems = courseName.filter(name =>
        !association.some(course => course.course.cou_name === name)
      ).map(name => ({ course: { cou_name: name } }));

      // Retorna um array com os dados que não existem mais [DOCUMENTO A EXCLUIR]
      const itemsNoLongerExist = association.filter(course =>
        !courseNameSet.has(course.course.cou_name)
      );

      return { subjectName, itemAnalysis: { duplicateItems, nonDuplicateItems, itemsNoLongerExist } };
    }
    // if (numberModel == 3) {
    //   const {  } = data;
    //   return {  };
    // }

    return { message: "Dados invalidos", type: "error" }
  }
  const resultData = await filterDataNecessary(numberModel, data);

  if (resultData.type === "error")
    return NextResponse.json(resultData, { status: 400 })


  try {
    const editData = await fetch(`http://localhost:5000/subject/edit/?id=${subjectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ departamentId, numberModel, resultData })
    })

    const response = await editData.json()

    // return NextResponse.json({ message: response.message, type: response.type })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error na edição da máteria", type: "error" })
  }
}
