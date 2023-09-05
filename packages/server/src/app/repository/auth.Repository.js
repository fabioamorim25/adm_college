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
                role:true,
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
                role:true,
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
                role:true,
                password: true,
            }
        })
    ]);

    return result
}


//CONSULTA NAS TABELAS PELO ID
export const consultID = async (id)=>{

    const result = await Promise.all([
        prisma.student.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                stu_name: true,
                password: false,
            }
        }),
        prisma.prof.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                prof_name: true,
                password: false,
            }
        }),
        prisma.departament.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                dep_name: true,
                password: false,
            }
        })
    ]);

    return result
}
