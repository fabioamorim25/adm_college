import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { nextAuthOptions } from "../../auth/[...nextauth]/options";


export async function PUT(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions);
  const departamentId = session?.user.id;
  const { id, cou_name } = await request.json();

  if (!id || !cou_name || !departamentId)
    return NextResponse.json({ message: "Dados invalidos", type:"error"}, { status: 400 })

  try {

    const editCourse = await fetch("http://localhost:5000/course/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
      body: JSON.stringify({ id, cou_name, departamentId })
    })

    const response = await editCourse.json()
    
    return NextResponse.json({ message: response.message, type: response.type })
    
  } catch (error) {
    return NextResponse.json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
  }
}