import * as yup from "yup"
import { prisma } from "../../lib/prismaClient"

export const subjectValidation = yup.object({
    sub_name: yup.string().required(),
    sub_shift: yup.string().required(),
    sub_start_time: yup.string().required(),
    sub_stop_time: yup.string().required(),
    sub_description: yup.string().required(),
    sub_mandatory: yup.string().required(),
    departamentId: yup.string().required()    
});

// VALIDAR SE EXISTE OUTRA MÁTERIA COM O MESMO NOME
export const subjectUnic = async(sub_name)=>{
    const subject = await prisma.subject.findUnique({
        where:{
            sub_name
        }
    })
    if(subject)
    return {message:'Já existe esse nome para uma máteria',type:'error'}
}

//VALIDAR OBRIGATORIEDADE DA MATERIA
export const checksubjects = async (subjectId,Id_PreRequisite)=>{
    //teste os ids não podem ser iguais
    if(subjectId === Id_PreRequisite)
        return {message:'As duas matérias são iguais'}
   
    //1° Validação: existe Ids
    const subject = await prisma.subject.findUnique({
        where:{
            id:subjectId
        }
    })
    const requisit = await prisma.subject.findUnique({
        where:{
            id:Id_PreRequisite
        }
    })
    
   
    if(!requisit && !subject)
        return {message:'As matérias não existem'}
    if(!requisit)
        return {message:'A materia obrigatoria não existe'}
    if(!subject)
        return {message:'A matéria não existe'}



        
    //2° Validar se ja existe a associação entre as materia 
    const subjectSubject = await prisma.subjects_Subjects.findMany({
        where:{
            AND: [
                { subjectId: subjectId },
                { Id_PreRequisite: Id_PreRequisite }
            ]
        }
    })

   
    if(subjectSubject.length > 0){
        return {message:'Já existe uma associado dessas matéria'}
    }

}
