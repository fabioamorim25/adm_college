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


export const  nameUniqueSubject = async(subjectName)=>{
    const subject = await prisma.subject.findUnique({
        where:{
            sub_name:subjectName
        }
    })
    if(!subject)
        return {message:'A materia não existe. Crie uma para continuar',type:'error'}
}

export const namesAssociateSubjectCourse = async(subjectName,courseName)=>{
    const associate = await prisma.course_Subject.findFirst({
        where:{
            subjectName,
            courseName
        }
    })
    
    if(associate){
        return {message:'Já existe uma associação dessa matéria com esse curso',type:'error'}
    }
}


//VALIDAR OBRIGATORIEDADE DA MATERIA
export const checksubjects = async (subjectName, preRequisite)=>{
    //1° Validação: existe name subject e requisite
    const [subject, requisit] = await Promise.all([
        prisma.subject.findUnique({ where: { sub_name: subjectName } }),
        prisma.subject.findUnique({ where: { sub_name: preRequisite } })
    ]);
    
        if (!subject && !requisit) {
            return { message: 'As matérias não existem',type: 'error' };
        } else if (!requisit) {
            return { message: 'A matéria obrigatória não existe',type: 'error' };
        } else if (!subject) {
            return { message: 'A matéria não existe',type:'error'};
        }

    //2° Validar se já existe a associação entre as materia 
    const subjectSubject = await prisma.subjects_Subjects.findMany({
        where:{
            AND: [
                { subjectName: subjectName },
                { preRequisite: preRequisite }
            ]
        }
    })

    if(subjectSubject.length > 0){
        return {message:'Já existe uma associação dessas matéria',type:'error'}
    }
}
