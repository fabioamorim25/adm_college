import { prisma } from "../../lib/prismaClient"



//VALIDAR SE JÁ EXISTE UM CADASTRO DE UM DEPARTAMENTO
export const existingDepartment = async()=>{
    const singleDepartment = await prisma.departament.findFirst();

   return singleDepartment
}