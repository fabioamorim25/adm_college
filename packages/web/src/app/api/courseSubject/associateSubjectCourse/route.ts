import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../../auth/[...nextauth]/options";


export async function POST(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions)
  const departamentId = session?.user.id;
  const { subjectName, courseName } = await request.json();

  // const = data

  try {

    if (!courseName) {
      return NextResponse.json({ message: "Dados invalidos", type: "error" })
    }

    const associate = await fetch(`http://localhost:5000/associate_Subject_Course/?departamentId=${departamentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
      body: JSON.stringify({ subjectName, courseName })
    })

    const response = await associate.json()

    return NextResponse.json({ message: response.message, type: response.type })
  } catch (error) {
    return NextResponse.json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
  }
}