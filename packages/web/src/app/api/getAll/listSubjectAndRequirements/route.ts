import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(nextAuthOptions);
  const token = session?.token;

  const { subjectName } = await request.json()

  if (!subjectName || !token) {
    return NextResponse.json({ message: "MetaDatas invalidos", type: "error" }, { status: 400 })
  }

  try {

    const response = await fetch("http://localhost:5000/getSubjectAndRequirements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ subjectName })
    })

    const res = await response.json()

    return NextResponse.json(res)

  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error na listagem das matérias", type: "error" })
  }
}