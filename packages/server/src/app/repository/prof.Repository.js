import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createProfs = async (info) => {

    const prof = await prisma.prof.create({
        data: {
            prof_name: info.prof_name,
            prof_status: info.prof_status,
            email: info.email,
            password: info.password,
            prof_phone: info.prof_phone,
            departament: {
                connect: {
                    id: info.departamentId
                }
            }
        },
        select: {
            id: true,
            prof_name: false,
            prof_status: false,
            email: false,
            password: false,
            prof_phone: false,
            departamentId: false,
        }
    });

    return prof
}
// DEFINIR MATERIA PARA O PROFESSOR
export const assignSubjectTeacher = async (profName, subjects) => {

    const createPromises = subjects.map(subject => {
        return prisma.porf_Subject.create({
            data: {
                profName: profName,
                subjectName: subject
            },
            select: {
                id: true,
                profName: true,
                subjectName: true
            }
        });
    });

    const subjectPorfs = await prisma.$transaction(createPromises);

    if (subjectPorfs)
        return { message: 'Associações salvas com sucesso' };
}

export const getListProfs = async () => {
    try {
        const prof = await prisma.prof.findMany({
            select: {
                id: true,
                email: true,
                password: false,
                role: false,
                prof_phone: true,
                prof_status: true,
                prof_name: true,
                _count: true,

                Porf_Subject: false,
                departament: false,
                departamentId: false,

                updatedAt: false,
                createdAt: true,
            }
        })
        return prof;
    } catch (error) {
        return res.status(404).json({ message: "Error na listagem dos professores", type: "error" })
    } finally {
        await prisma.$disconnect();
    }
}
export const getDataProf = async (profId) => {
    try {
        const prof = await prisma.prof.findUnique({
            where: {
                id: profId
            },
            select: {
                id: false,
                email: true,
                password: false,
                role: false,
                prof_phone: true,
                prof_status: true,
                prof_name: true,
                _count: false,
                Porf_Subject: false,
                departament: false,
                departamentId: false,
                updatedAt: false,
                createdAt: false,
            }
        })

        return prof

    } catch (error) {
        return res.status(404).json({ message: "Error nos dados do professore", type: "error" })
    } finally {
        await prisma.$disconnect();
    }
}

export const updateProfData = async (id, info) => {
    try {
        const updated = await prisma.prof.update({
            where: {
                id
            },
            data: {
                email: info.email,
                prof_name: info.prof_name,
                prof_phone: info.prof_phone,
                prof_status: info.prof_status,
                departament: {
                    connect: {
                        id: info.departamentId
                    }
                }
            },
            select: {
                id: true,
                email: false,
                password: false,
                role: false,
                prof_phone: false,
                prof_status: false,
                prof_name: false,
                _count: false,
                Porf_Subject: false,
                departament: false,
                departamentId: false,
                updatedAt: false,
                createdAt: false,
            }
        })

        return updated;
    } catch (error) {
        return res.status(404).json({ message: "Error ao edita os dados do professor", type: "error" })
    } finally {
        await prisma.$disconnect();
    }
}

export const listSubjectsAndSubjectProf = async (profName) => {
    try {
        const [subjectsProf, subjects] = await Promise.all([
            prisma.porf_Subject.findMany({
                where: {
                    profName: profName
                },
                select: {
                    id: true,
                    prof: false,
                    profName: false,
                    subject: false,
                    subjectName: true,
                    updatedAt: false,
                    createdAt: false,
                }
            }),
            prisma.subject.findMany({
                select: {
                    id: true,
                    sub_name: true,
                    sub_shift: false,
                    sub_start_time: false,
                    sub_stop_time: false,
                    sub_description: false,
                    sub_mandatory: false,
                    createdAt: false,
                    updatedAt: false,
                    departamentId: false,
                }
            })
        ])

        return { subjectsProf, subjects }

    } catch (error) {
        return res.status(404).json({ message: "Tivemos um error na listagem dos dados", type: "error" })
    } finally {
        await prisma.$disconnect();
    }
}