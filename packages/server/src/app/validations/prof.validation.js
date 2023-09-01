import * as yup from "yup"
import { prisma } from "../../lib/prismaClient"


//VALIDAR OS DADOS DO PROFESSOR
export const profValidation = yup.object({
    prof_name:yup.string().required(),
    prof_status:yup.boolean().required(),
    prof_email:yup.string().required(),
    prof_password:yup.string().required().min(6),
    prof_phone:yup.string(),
    departamentId:yup.string().required()
})


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