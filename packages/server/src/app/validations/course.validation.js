import { prisma } from "../../lib/prismaClient"

// VALIDAR SE EXISTE OUTRO CURSO COM O MESMO NOME
export const courseUnic = async(cou_name)=>{
  const course = await prisma.course.findUnique({
      where:{
          cou_name
      }
  })
  if(course)
  return {message:'Já existe esse nome para um curso',type:'error'}
}