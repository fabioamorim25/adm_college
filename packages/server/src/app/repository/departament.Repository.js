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