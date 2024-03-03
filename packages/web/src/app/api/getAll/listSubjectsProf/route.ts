import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { nextAuthOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions);
  const token = session?.token;
  const { profName } = await request.json();

  if (!token || !profName) {
    return NextResponse.json({ message: "MetaDatas invalidos", type: "error" }, { status: 400 })
  }


  try {

    const response = await fetch(`http://localhost:5000/listSubjectsProf/?name=${profName}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const res = await response.json();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error na listagem das matérias", type: "error" })
  }
}