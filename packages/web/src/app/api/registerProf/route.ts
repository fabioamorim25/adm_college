import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions)

  const {
    prof_name,
    email,
    password,
    prof_phone,
    prof_status,
    departamentId,
  } = await request.json()


  if (!prof_name || !email || !password || !prof_phone || !prof_status || !departamentId)
    return NextResponse.json({ message: "Dados invalidos", type:"error"}, { status: 400 })

  const submitProf = await fetch("http://localhost:5000/prof/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    },
    body: JSON.stringify({ prof_name, email, password, prof_phone, prof_status, departamentId })
  })

  const response = await submitProf.json()

  return NextResponse.json(response)
}