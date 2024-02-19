import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/options";



export async function POST(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions)
  const token = session?.token
  const { profId } = await request.json()

  if (!token || !profId) {
    return NextResponse.json({ message: "MetaDatas invalidos", type: "error" }, { status: 400 })
  }

  try {

    const response = await fetch(`http://localhost:5000/getProf/?id=${profId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const res = await response.json()

    return NextResponse.json(res)

  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error ao mostra os dados do professor", type: "error" })
  }
}