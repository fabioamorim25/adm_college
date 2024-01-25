import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../../auth/[...nextauth]/options";


export async function GET(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions);
  const token = session?.token

  try {
    const response = await fetch("http://localhost:5000/listInfoSubjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    if (response.ok) {
      var res = await response.json()
      return NextResponse.json(res)
    }


  } catch (error) {
    return NextResponse.json({ message: "Tivemos um error na listagem das máterias", type: "error" })
  }
}