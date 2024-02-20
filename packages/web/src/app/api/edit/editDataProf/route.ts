import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/options";

export async function PUT(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions);
  const token = session?.token;
  const departamentId = session?.user.id
  const { data, profId } = await request.json();

  if (!data || !profId || !token) {
    return NextResponse.json({ message: "MetaDatas invalidos", type: "error" }, { status: 400 })
  }


  try {
    const response = await fetch(`http://localhost:5000/prof/edit/?id=${profId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ data, departamentId })
    })

    const res = await response.json()

    return NextResponse.json({ message: res.message, type: res.type })

  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error na edição do professor", type: "error" })
  }
}