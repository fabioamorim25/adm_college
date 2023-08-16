import { prisma } from "../../lib/prismaClient"


//VALIDAR SE EXISTE O ALUNO
export const validationStudent = async (studentId)=>{
    const student = await prisma.student.findUnique({
        where:{
            id:studentId
        }
    })

    return student
}