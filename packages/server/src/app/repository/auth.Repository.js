import { prisma } from '../../lib/prismaClient'


//CONSULTA NAS TABELAS
export const consultDocument = async (email)=>{

    const result = await Promise.all([
        prisma.student.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                stu_name: true,
                password: true,
            }
        }),
        prisma.prof.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                prof_name: true,
                password: true,
            }
        }),
        prisma.departament.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                dep_name: true,
                password: true,
            }
        })
    ]);

    return result
}
