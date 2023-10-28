import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../../auth/[...nextauth]/options";


export async function POST(request: NextRequest) {
  const {courseName} = await request.json();
  const session = await getServerSession(nextAuthOptions)

  try {
    const response = await fetch("http://localhost:5000/getAllSubject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    },
    body:JSON.stringify({courseName})
  })

  if(response.ok)
    var res = await response.json()
    return NextResponse.json(res)
  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error na listagem das matérias", type:"error"})
  }   
}