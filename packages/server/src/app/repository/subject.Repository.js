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

// ASSOCIAR UMA MATERIA A UM CURSO
export const createAssociateSubjectCourse = async(subjectName,courseName)=>{
    const associate = await prisma.course_Subject.create({
        data:{
            subjectName,
            courseName    
        },
        select:{
            id:true,
            subjectName:true,
            courseName:true
        }
    })

    return associate
}

// LISTAR TODAS AS MATÉRIAS DE UM CURSO
export const getSubjectsName = async (courseName) => {
    const subjects = await prisma.course_Subject.findMany({
        where: {
          courseName: courseName
        },
        select: {
          subject: {
            select: {
                id:false,
                sub_name:true,
                sub_shift:false,
                sub_start_time:false,
                sub_stop_time:false,
                sub_description:false,
                sub_mandatory:false,
                createdAt:false,
                updatedAt:false,
                departamentId:false, 
            }
          }
        }
      })
   
    //filtra o obj para retornar a chave e o valor das matérias
    return subjects.map(subject => ({ sub_name: subject.subject.sub_name }));
}


//OBRIGATORIEDADE DA MATERIA
export const createSubjectMandatory = async(subjectName,preRequisite)=>{
    const mandayory = await prisma.subjects_Subjects.create({
        data:{
            subject:{
                connect:{
                    sub_name: subjectName
                }
            },
            preRequisite
        },
        select:{
            id:true,
            subjectName:true,
            preRequisite:true,
        }
    })

    return ;
}

// LISTAR MATÉRIAS
export const listSubjects = async()=>{
    const subjects = await prisma.subject.findMany({
        select:{
            id:false,
            sub_name:true,
            sub_shift:false,
            sub_start_time:false,
            sub_stop_time:false,
            sub_description:false,
            sub_mandatory:false,
            createdAt:false,
            updatedAt:false,
            departamentId:false,     
        }
    })
    return subjects
     //filtra o obj para retornar a chave e o valor das matérias
    //  return subjects.map(subject => ({ sub_name: subject.sub_name }));
}
