import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createCourses = async (cou_name, departamentId) => {
    const course = await prisma.course.create({
        data: {
            cou_name,
            departament: {
                connect: {
                    id:departamentId
                }
            }
        },
        select: {
            id: true,
            cou_name: true,
            departamentId: true,
        }
    });


    return course;
}