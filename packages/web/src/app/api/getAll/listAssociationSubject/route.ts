import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/options";


export async function POST(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions);
  const token = session?.token;
  const { subjectId} = await request.json();
  
  console.log({'id recebido':subjectId})

  if (!token || !subjectId)
    return NextResponse.json({ message: "Metadata invalido", type: "error" })


  try {


    const response = await fetch(`http://localhost:5000/listSubjectAssociation/?subjectId=${subjectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json()

    return NextResponse.json(data)

  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error na listagem dos cursos", type: "error" })
  }
}