import * as yup from "yup"
import { prisma } from "../../lib/prismaClient"


//VALIDAR OS DADOS RECEBIDOS
export const studentValidation = yup.object({
    stu_name:yup.string().required(),
    stu_registration:yup.string().required(),
    stu_course:yup.string().required(),
    stu_status:yup.boolean().required(),
    stu_period:yup.string().required(),
    stu_mother_name:yup.string().required(),
    stu_father_name:yup.string().required(),
    stu_phone:yup.string(),
    stu_email:yup.string().required(),
    stu_password:yup.string().required().min(6),
    courseId:yup.string().required()
})

//VALIDAR SE EXISTE O ALUNO
export const validationStudent = async (studentId)=>{
    const student = await prisma.student.findUnique({
        where:{
            id:studentId
        }
    })

    return student
}