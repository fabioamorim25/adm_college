import * as yup from "yup"
import { prisma } from "../../lib/prismaClient";


//VALIDAR DADOS RECEBIDOS NA CRIAÇÃO DO ENDEREÇO
export const addressValidation = yup.object({
    add_street: yup.string().required('O nome da rua é obrigatório'),
    add_city: yup.string().required('O nome da cidade é obrigatório'),
    add_neighborhood: yup.string(),
    add_number: yup.string().required('O número da casa é obrigatório'),
    add_complement: yup.string(),
    studentName:yup.string().required('O nome do aluno é obrigatório'),
});

// VALIDAR SE JÁ EXISTE UM ENDEREÇO CADASTRADO
export const uniqueAddress = async (add_street,studentName)=>{
    const address = await prisma.address.findFirst({
        where:{
            AND: [
                { add_street: add_street },
                { studentName:studentName }
            ]
        }
    })
    
    if(address)
        return { message: "Já existe um endereço para o aluno", type: "error" }

    return null
}