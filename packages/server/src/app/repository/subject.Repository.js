import { prisma } from '../../lib/prismaClient'



// CRIAR O DOCUMENTO E RETONAR O DADO
export const createSubjects = async (sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description,sub_mandatory, departamentId) => {
    // Converter o valor de sub_mandatory para boolean
    if (sub_mandatory === "true") sub_mandatory = true;
    if (sub_mandatory === "false") sub_mandatory = false;
   
    const subject = await prisma.subject.create({
        data: {
            sub_name,
            sub_shift,       
            sub_start_time: `${sub_start_time}:00Z`,
            sub_stop_time: `${sub_stop_time}:00Z`,   
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
 
//OBRIGATORIEDADE DA MATERIA
export const createSubjectMandatory = async(subjectId,Id_PreRequisite)=>{
    const mandayory = await prisma.subjects_Subjects.create({
        data:{
            subject:{
                connect:{
                    id: subjectId
                }
            },
            Id_PreRequisite
        },
        select:{
            id:true,
            subjectId:true,
            Id_PreRequisite:true,
        }
    })

    return mandayory;
}