import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { nextAuthOptions } from "../../auth/[...nextauth]/options";



export async function POST(request: NextRequest) {

  const subjectId = await request.json();

  const session = await getServerSession(nextAuthOptions);
  const token = session?.token;

  if (!subjectId || !token) {
    return NextResponse.json({ message: "MetaDatas invalidos", type: "error" }, { status: 400 })
  }

  try {
    const response = await fetch(`http://localhost:5000/getSubject/?id=${subjectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    const res = await response.json()

    return NextResponse.json(res)

  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error ao mostra os dados da máteria", type: "error" })
  }
}