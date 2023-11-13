import * as yup from "yup"
import { prisma } from "../../lib/prismaClient"


//VALIDAR OS DADOS RECEBIDOS
export const studentValidation = yup.object({
    stu_name: yup.string().required('O nome do aluno é obrigatório'),
    stu_registration: yup.string().required('O número de matrícula é obrigatório'),
    stu_status: yup.boolean().required('O status do aluno é obrigatório'),
    stu_period: yup.string().required('O periodo é obrigatório'),
    stu_mother_name: yup.string().required('O nome da mãe é obrigatório'),
    stu_father_name: yup.string(),
    stu_phone: yup.string(),
    email: yup.string().required('O campo email é obrigatório'),
    password: yup.string().required('O campo password é obrigatório').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    courseName: yup.string().required('O nome do curso é obrigatório'),
});

//VALIDAR SE EXISTE O ALUNO
export const validationStudent = async (stu_name,email)=>{
    const student = await prisma.student.findFirst({
        where:{
            OR: [
                { stu_name: stu_name },
                { email: email }
            ]
        }
    })
    
    if(student)
        return { message: "O aluno já existe no sistema", type: "error" }

    return null
}


//VALIDAR SE EXISTE O ALUNO PELO NOME
export const validationStudentName = async (studentName)=>{
    const student = await prisma.student.findFirst({
        where:{
            stu_name: studentName
        }
    })
    
    if(!student)
        return { message: "O aluno não existe no sistema", type: "error" }

    return null
}