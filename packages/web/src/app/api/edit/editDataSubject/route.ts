import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth'

import { nextAuthOptions } from "../../auth/[...nextauth]/options";


export async function PUT(request: NextRequest) {

  const { subjectId, numberModel, data } = await request.json();
  const session = await getServerSession(nextAuthOptions);
  const token = session?.token;
  const departamentId = session?.user.id


  if (!subjectId || !numberModel || !token || !departamentId) {
    return NextResponse.json({ message: "MetaDatas invalidos2", type: "error" }, { status: 400 })
  }

  async function filterDataNecessary(numberModel: number, data: any) {
    if (numberModel == 1) {
      const { sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory } = data;
      return { sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory };
    }
    // if (numberModel == 2) {
    //   const {  } = data;
    //   return {  };
    // }
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
   
    return NextResponse.json({ message: response.message, type: response.type })

  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error na edição da máteria", type: "error" })
  }
}
