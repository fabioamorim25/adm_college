import { prisma } from "../../lib/prismaClient"
import * as yup from "yup"


//VALIDAR OS DADOS RECEBIDOS NA CRIAÇÃO DA NOTA
export const notesValidation = yup.object({
    av1:yup.number().min(0),
    av2:yup.number().min(0),
    av3:yup.number().min(0),
    final_grade:yup.number().required().min(0),
    attendance:yup.number().required().min(0),
    student_count:yup.number().required().min(0),
    studentId:yup.string().required(),
    subjectId:yup.string().required()
})

//VALIDAR SE EXISTE O ALUNO E A MATÉRIA
export const existingStudentSubject = async (studentId, subjectId)=>{
    //Validação: existe Ids
    const subject = await prisma.subject.findUnique({
        where:{
            id:subjectId
        }
    })
    const student = await prisma.student.findUnique({
        where:{
            id:studentId
        }
    })
    
    if(!student && !subject)
        return {message:'A matéria e o aluno não existem'}
    if(!student)
        return {message:'O aluno não existe'}
    if(!subject)
        return {message:'A matéria não existe'}
}