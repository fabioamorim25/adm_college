import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../auth/[...nextauth]/options";


export async function POST(request: NextRequest) {

  const session = await getServerSession(nextAuthOptions)

  const { sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory, sub_day } = await request.json()
  const departamentId = session?.user.id

  if (!sub_name || !sub_shift || !sub_start_time || !sub_stop_time || !sub_description || !sub_mandatory || !departamentId)
    return NextResponse.json({ message: "Dados invalidos", type: "error" })

  if (new Date(sub_start_time) >= new Date(sub_stop_time)) {
    return NextResponse.json({ message: "A data ou a hora não é valida", type: "error" });
  }



  try {
    const submitCourse = await fetch("http://localhost:5000/subject/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.token}`
      },
      body: JSON.stringify({
        sub_name,
        sub_shift,
        sub_start_time,
        sub_stop_time,
        sub_description,
        sub_mandatory,
        sub_day,
        departamentId
      })
    })
    
    const response = await submitCourse.json();
  
   return NextResponse.json({ message: response.message, type: response.type })
  } catch (error) {
    return NextResponse.json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
  }

}