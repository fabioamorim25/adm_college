import { prisma } from "../../lib/prismaClient"
import * as yup from "yup"

//VALIDAR OS DADOS RECEBIDOS NA CRIAÇÃO DO DEPARTAMENTO
export const departamentValidation = yup.object({
    dep_name: yup.string().required('O campo nome é obrigatório'),
    email: yup.string().required('O campo email é obrigatório'),
    password: yup.string().required('O campo password é obrigatório').min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

//VALIDAR SE JÁ EXISTE UM CADASTRO DE UM DEPARTAMENTO
export const existingDepartment = async()=>{
    const singleDepartment = await prisma.departament.findFirst();

   return singleDepartment ? true : false;
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