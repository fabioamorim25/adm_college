import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createProfs = async (prof_name,prof_status,email,password,prof_phone,departamentId) => {
    
    const prof = await prisma.prof.create({
        data: {
            prof_name, 
            prof_status,
            email,
            password,
            prof_phone,
            departament: {
                connect: {
                    id:departamentId
                }
            }
        },
        select: {
            id: true,
            prof_name: true, 
            prof_status: true,
            email: true,
            password: false,
            prof_phone: false,
            departamentId: true,
        }
    });


    return prof;
}


// DEFINIR MATERIA PARA O PROFESSOR
export const assignSubjectTeacher = async(profId,subjectId)=>{
    
    const subjectPorf = await prisma.porf_Subject.create({
        data:{
            profId,
            subjectId
        },
        select:{
            id:true,
            profId:true,
            subjectId:true
        }
    })
    
    return subjectPorf
}
