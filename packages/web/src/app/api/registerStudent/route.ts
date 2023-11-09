import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions)
  const {
    stu_name,
    stu_registration,
    stu_status,
    stu_period,
    stu_mother_name,
    stu_father_name,
    stu_phone,
    email,
    password,
    courseName
  } = await request.json()

  try {
    if (!stu_name || !stu_registration || !stu_status || !stu_period || !stu_mother_name || !stu_father_name || !stu_phone || !email || !password || !courseName)
      return NextResponse.json({ message: "Dados invalidos", type: "error" })

    const submitStudent = await fetch("http://localhost:5000/student/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
      body: JSON.stringify({
        stu_name, stu_registration, stu_status, stu_period,
        stu_mother_name, stu_father_name, stu_phone, email, password,courseName
       })
    })

    const response = await submitStudent.json()

    return NextResponse.json({ message: response.message, type: response.type })

  } catch (error) {
    return NextResponse.json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
  }
}