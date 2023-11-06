import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createStudents = async (stu_name,stu_registration, stu_status,stu_period,stu_mother_name,stu_father_name,stu_phone,email,password,courseName) => {

    // Convert prof_status to a boolean
    if (stu_status === "true") stu_status = true;
    if (stu_status === "false") stu_status = false;

    const student = await prisma.student.create({
        data: {
            stu_name,
            stu_registration,
            stu_status,
            stu_period,
            stu_mother_name,
            stu_father_name,
            stu_phone,
            email,
            password,
            course: {
                connect: {
                    cou_name: courseName
                }
            }
        },
        select: {
            id: false,
            stu_name:true,
            stu_registration:true,
            stu_status:false,
            stu_period:false,
            stu_mother_name:false,
            stu_father_name:false,
            stu_phone:false,
            email:false,
            password:false,
            courseName:false,
        }
    });

    if(student)
        return { message: "O aluno foi registrado com sucesso", type: "success" }

    return { message: "tivemos um erro ao registrar o aluno", type: "error" }
}
