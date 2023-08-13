import { prisma } from "../../lib/prismaClient"


//VALIDAR SE EXISTE UM PROFESSOR OU MATERIA
export const checkSubjectProfId = async(profId,subjectId)=>{
    const checkProf = await prisma.prof.findUnique({
        where:{
            id:profId
        }
    })
    const checkSubject = await prisma.subject.findUnique({
        where:{
            id:subjectId
        }
    })
    
    if(!checkProf && !checkSubject)
        return {message:'A matéria e o professor não existem'}
    if(!checkProf)
        return {message:'O professor não existe'}
    if(!checkSubject)
        return {message:'A matéria não existe'}

    //se tiver professor e materia ja cadastrado 
    const profSubject = await prisma.porf_Subject.findMany({
        where:{
            AND: [
                { profId: profId },
                { subjectId: subjectId }
            ]
        }
    })
    if(profSubject)
        return {message:'O professor já esta associado a essa matéria'}
}