import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../../auth/[...nextauth]/options";


export async function POST(request: NextRequest) {

  const {preRequisite,subjectName} = await request.json();
  const session = await getServerSession(nextAuthOptions)
  
  try {

    if (preRequisite === subjectName) {
      return NextResponse.json({ message: "As matérias são iguais", type: "error" })
    }

    const requisite = await fetch("http://localhost:5000/mandatory_Subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
      body: JSON.stringify({preRequisite,subjectName})
    })

    const response = await requisite.json()

    return NextResponse.json({ message: response.message, type: response.type })
  } catch (error) {
    return NextResponse.json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
  }
}