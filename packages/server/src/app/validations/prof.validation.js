import * as yup from "yup"
import { prisma } from "../../lib/prismaClient"


//VALIDAR OS DADOS DO PROFESSOR
export const profValidation = yup.object({
    prof_name: yup.string().required('O nome do professor é obrigatório'),
    prof_status: yup.string().required('O status do professor é obrigatório'),
    email: yup.string().required('O email é obrigatório'),
    password: yup.string().required('A senha é obrigatório').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    prof_phone: yup.string(),
    departamentId: yup.string().required('O departamento é obrigatório')
});
 
//VALIDAR SE JÁ EXISTE UM PROFESSOR
export const profEmailUnique = async(email,prof_name)=>{
    const prof = await prisma.prof.findFirst({
        where: {
            OR: [
                { email: email },
                { prof_name: prof_name }
            ]
        }
    });

    if (prof) {
        return { message: 'Já existe um professor com esse email ou nome', type: 'error' };
    }
    return null;
} 

//VALIDAR SE EXISTE UM PROFESSOR OU MATERIA
export const checkSubjectProfName = async(profName, subjects)=>{
    // Consulta simultânea de todos os assuntos e o professor
    const [checkProf, ...checkSubjects] = await Promise.all([
        prisma.prof.findUnique({ where: { prof_name: profName } }),
         ...subjects.map(subjectName => prisma.subject.findUnique({ where: { sub_name: subjectName } })),
    ]);

    // Verifica se o professor e os assuntos existem
    if(!checkProf && checkSubjects.every(subject => !subject))
        return {message:'A matéria e o professor não existem'}
    else if(!checkProf)
        return {message:'O professor não existe'}
    else if(checkSubjects.some(subject => !subject))
        return {message:'A matéria não existe'}

    return
}

// Consulta associação professor e alguma das matéria
export const checkAssociateSubjectProf = async(profName, subjects)=>{
    const profSubjectsExist = await Promise.all(subjects.map(subjectName => 
        prisma.porf_Subject.findFirst({
            where: {
                AND: [
                    { profName: profName },
                    { subjectName: subjectName }
                ]
            }
        })
    ));

    if (profSubjectsExist.some(profSubject => profSubject)) {
        return { message: 'O professor já está associado a uma das matérias' };
    }
}
