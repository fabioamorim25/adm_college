import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createStudents = async (stu_name, stu_registration, stu_course, stu_status, stu_period, stu_mother_name, stu_father_name, stu_phone, stu_email, stu_password, courseId) => {

    const student = await prisma.student.create({
        data: {
            stu_name,
            stu_registration,
            stu_course,
            stu_status,
            stu_period,
            stu_mother_name,
            stu_father_name,
            stu_phone,
            stu_email,
            stu_password,
            course: {
                connect: {
                    id: courseId
                }
            }
        },
        select: {
            id: true,
            stu_name: true,
            stu_registration: true,
            stu_course: true,
            stu_status: true,
            stu_period: true,
            stu_mother_name: true,
            stu_father_name: true,
            stu_phone: true,
            stu_email: true,
            stu_password: false,
            courseId: true
        }
    });



    return student;
}
