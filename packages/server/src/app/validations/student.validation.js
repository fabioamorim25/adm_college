import * as yup from "yup"
import { prisma } from "../../lib/prismaClient"


//VALIDAR OS DADOS RECEBIDOS
export const studentValidation = yup.object({
    stu_name: yup.string().required('O campo stu_name é obrigatório'),
    stu_registration: yup.string().required('O campo stu_registration é obrigatório'),
    stu_course: yup.string().required('O campo stu_course é obrigatório'),
    stu_status: yup.boolean().required('O campo stu_status é obrigatório'),
    stu_period: yup.string().required('O campo stu_period é obrigatório'),
    stu_mother_name: yup.string().required('O campo stu_mother_name é obrigatório'),
    stu_father_name: yup.string().required('O campo stu_father_name é obrigatório'),
    stu_phone: yup.string(),
    email: yup.string().required('O campo email é obrigatório'),
    password: yup.string().required('O campo password é obrigatório').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    courseId: yup.string().required('O campo courseId é obrigatório')
});

//VALIDAR SE EXISTE O ALUNO
export const validationStudent = async (studentId)=>{
    const student = await prisma.student.findUnique({
        where:{
            id:studentId
        }
    })

    return student
}