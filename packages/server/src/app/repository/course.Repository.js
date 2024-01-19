import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createCourses = async (cou_name, departamentId) => {
    try {
     await prisma.course.create({
            data: {
                cou_name,
                departament: {
                    connect: {
                        id:departamentId
                    }
                }
            },
            select: {
                id: false,
                cou_name: false,
                departamentId: false,
            }
        });
        
        return {message:'O Curso foi criado com sucesso',type:'success'}
    
    } catch (error) {
        return {message:'Tivemos um erro ao criar o curso',type:'error'}
    } finally{
        await prisma.$disconnect();
    }
}
// CRIAR O DOCUMENTO E RETONAR O DADO
export const editCourses = async (id,cou_name, departamentId) => {
    try {
       await prisma.course.update({
            where:{
                id
            },
            data: {
                cou_name,
                departament: {
                    connect: {
                        id:departamentId
                    }
                }
            },
            select: {
                id: true,
                cou_name: true,
                departamentId: true,
            }
        });

        return {message:'O Curso foi editado com sucesso',type:'success'}

    } catch (error) {
        return {message:'Tivemos um erro ao editar o curso',type:'error'}
    } finally{
        await prisma.$disconnect();
    }
}

//LISTAR TODOS OS CURSOS
export const getCourse = async()=>{
    try {
        const courses = await prisma.course.findMany({
            select:{
                id:true,           
                cou_name:true,     
                updatedAt:true,    
                createdAt:false,    
                departamentId:false,
            }
        })
    
        return courses
        
    } catch (error) {
        return 
    } finally{
        await prisma.$disconnect();
    }
}