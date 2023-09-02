import { prisma } from "../../lib/prismaClient"
import * as yup from "yup"

//VALIDAR OS DADOS RECEBIDOS NA CRIAÇÃO DO DEPARTAMENTO
export const departamentValidation = yup.object({
    dep_name:yup.string().required(),
    email:yup.string().required(),
    password:yup.string().required().min(6),
})

//VALIDAR SE JÁ EXISTE UM CADASTRO DE UM DEPARTAMENTO
export const existingDepartment = async()=>{
    const singleDepartment = await prisma.departament.findFirst();

   return singleDepartment
}

//VALIDAR SE JÁ EXISTE UM DEPARTAMENTO PELO ID
export const checkDepartmentId = async(id)=>{
    const department = await prisma.departament.findUnique({
        where:{
            id
        }
    });
   return department
}