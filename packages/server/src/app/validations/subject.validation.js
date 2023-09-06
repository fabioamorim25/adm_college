import { prisma } from "../../lib/prismaClient"



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
