import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createProfs = async (prof_name, prof_status, email, password, prof_phone, departamentId) => {
    // Convert prof_status to a boolean
    if (prof_status === "true") prof_status = true;
    if (prof_status === "false") prof_status = false;

    const prof = await prisma.prof.create({
        data: {
            prof_name,
            prof_status,
            email,
            password,
            prof_phone,
            departament: {
                connect: {
                    id: departamentId
                }
            }
        },
        select: {
            id: false,
            prof_name: true,
            prof_status: true,
            email: true,
            password: false,
            prof_phone: false,
            departamentId: true,
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
    }
}