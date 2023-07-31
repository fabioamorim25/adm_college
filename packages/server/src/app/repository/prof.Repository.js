import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createProfs = async (prof_name,prof_status,prof_email,prof_password,prof_phone,departamentId) => {
    
    const prof = await prisma.prof.create({
        data: {
            prof_name, 
            prof_status,
            prof_email,
            prof_password,
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
            prof_email: true,
            prof_password: false,
            prof_phone: false,
            departamentId: true,
        }
    });


    return prof;
}
 