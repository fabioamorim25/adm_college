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
export const assignSubjectTeacher = async(profName, subjects)=>{
    
    const createPromises = subjects.map(subject => {
        return prisma.porf_Subject.create({
            data:{
               profName: profName,
               subjectName:subject
            },
            select:{
                id:true,
                profName:true,
                subjectName:true
            }
        });
    });

    const subjectPorfs = await prisma.$transaction(createPromises);
    
    if(subjectPorfs)
        return { message: 'Associações salvas com sucesso' };
}