import * as yup from "yup"
import { prisma } from "../../lib/prismaClient"


//VALIDAR OS DADOS DO PROFESSOR
export const profValidation = yup.object({
    prof_name: yup.string().required('O campo prof_name é obrigatório'),
    prof_status: yup.string().required('O campo prof_status é obrigatório'),
    email: yup.string().required('O campo email é obrigatório'),
    password: yup.string().required('O campo password é obrigatório').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    prof_phone: yup.string(),
    departamentId: yup.string().required('O campo departamentId é obrigatório')
});

//VALIDAR SE EXISTE UM PROFESSOR OU MATERIA
export const profEmailUnique = async(email)=>{
    const prof = await prisma.prof.findUnique({
        where:{
            email
        }
    })
    if(prof)
    return {message:'Já existe esse email para um professor',type:'error'}

}

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
    if(profSubject.length > 0)
        return {message:'O professor já esta associado a essa matéria'}
}