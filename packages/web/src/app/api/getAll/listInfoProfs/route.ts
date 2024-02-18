import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/options";


export async function GET(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions);
  const token = session?.token;

  try {

    const response = await fetch('http://localhost:5000/listInfoProf', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    const res = await response.json()
    return NextResponse.json(res)

  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error na listagem dos professores", type: "error" })
  }
}