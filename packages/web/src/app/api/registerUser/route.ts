import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
  //pegar os dados da requisição
  const data = await request.json()
  // desestruturar 
  const {dep_name,email,password} = data
  //validar se esta faltando algum dado do formulario
  if(!dep_name||!email||!password){
    return  NextResponse.json({msg:"Dados invalidos"},{status:400})
  }

  //ENVIAR DADOS PARA O BACK END
  const submitUser = await fetch("http://localhost:5000/department/register",{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({dep_name,email,password})
  })
  //receber apenas a resposta do back end
  const user = await submitUser.json()
  
  // retornar os dados do user
  return NextResponse.json(user)
}