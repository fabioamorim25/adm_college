import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/options";



export async function POST(request: NextRequest) {

  // pegar os dados do departamento 
  const session = await getServerSession(nextAuthOptions)
  const departamentId = session?.user.id
  const token = session?.token

  const {add_street,add_city,add_neighborhood,add_number,add_complement,studentName} = await request.json()

  
  if(!departamentId || !token)
    return NextResponse.json({ message: "Ação não autorizada", type:"error"}, { status: 400 })

  if (!add_street || !add_city|| !add_neighborhood || !add_number || !add_complement || !studentName)
    return NextResponse.json({ message: "Dados invalidos", type:"error"}, { status: 400 })
  
   
   
    try {
      const submitAddress = await fetch("http://localhost:5000/createAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
        body: JSON.stringify({add_street,add_city,add_neighborhood,add_number,add_complement,studentName,departamentId})
      })

      const response = await submitAddress.json()

      return NextResponse.json({ message: response.message, type: response.type })
    
    } catch (error) {
      return NextResponse.json({ message: "Error no servidor. Por favor tente mais tarde", type:"error"})
    }
}