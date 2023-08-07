import {prisma} from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR OS DADOS (menos a senha)
export const createDepartament = async(dep_name, dep_email, dep_password)=>{

    const departament = await prisma.departament.create({
        data:{
            dep_name,
            dep_email,
            dep_password
        },
        select:{
            id:true,
            dep_name:true,
            dep_email: true,
            dep_password:false
        }
    });


    return departament;
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