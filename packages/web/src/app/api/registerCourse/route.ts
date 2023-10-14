import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../auth/[...nextauth]/options";


export async function POST(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions)

  const {cou_name} = await request.json()
  const departamentId = session?.user.id

  if (!cou_name||! departamentId)
    return NextResponse.json({ message: "Dados invalidos", type:"error"}, { status: 400 })

  try {
    const submitCourse = await fetch("http://localhost:5000/course/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    },
    body: JSON.stringify({ cou_name, departamentId })
  })

  if(submitCourse.ok)
    return NextResponse.json({ message: "O curso foi criado com sucesso", type:"success"})
  
  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error na criação do curso", type:"error"})
  }   
}