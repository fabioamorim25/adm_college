import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createSubjects = async (sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description,sub_mandatory, departamentId) => {
    
    const subject = await prisma.subject.create({
        data: {
            sub_name,
            sub_shift,       
            sub_start_time,  
            sub_stop_time,   
            sub_description, 
            sub_mandatory,
            departament: {
                connect: {
                    id:departamentId
                }
            }
        },
        select: {
            id: true,
            sub_name: true,
            sub_shift:true,       
            sub_start_time:true,  
            sub_stop_time:true,   
            sub_description:true, 
            sub_mandatory:true,
            departamentId: true,
        }
    });


    return subject;
}
 