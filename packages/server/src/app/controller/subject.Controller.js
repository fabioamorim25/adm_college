import { createSubjects, createSubjectMandatory, createAssociateSubjectCourse, getSubject } from "../repository/subject.Repository";
import {checksubjects, nameUniqueSubject, namesAssociateSubjectCourse, subjectUnic, subjectValidation} from '../validations/subject.validation'

export const create = async(req,res)=>{
   
    let {sub_name,sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory, departamentId}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        await subjectValidation.validate(req.body)

        // 2° VALIDAR SE O NOME DA MATÉRIA JÁ EXISTE
        const nameUnique = await subjectUnic(sub_name)
        if (nameUnique) {
            return res.status(400).json({ message: nameUnique.message, type:nameUnique.type })
         }

        //3° MANDAR CRIAR A MATÉRIA
        await createSubjects(
            sub_name,
            sub_shift,
            sub_start_time,
            sub_stop_time,
            sub_description,
            sub_mandatory,
            departamentId
        ) 
        
        return res.status(201).json({message:'Matéria foi cadastrada com sucesso',type:'success'})
    
    } catch (error) {
        return res.status(404).json({message:'Tivemos um erro ao cadastra a matéria',type:'error'})
    }
}

// ASSOCIAR UMA MATERIA A UM CURSO
export const associateSubjectCourse = async(req,res)=>{
    const {subjectName,courseName} = req.body
    console.log(subjectName)
    try {
        //VALIDAR SE O NOME DA MATERIA EXISTE
        const uniqueName = await nameUniqueSubject(subjectName)
        if (uniqueName)
            return res.status(400).json({ message: uniqueName.message, type:uniqueName.type })
  
        // VALIDAR SE JÁ EXISTE A ASSOCIAÇÃO ENTRE A MATERIA E O CURSO
        const associate = await namesAssociateSubjectCourse(subjectName,courseName)
        if (associate)
            return res.status(400).json({ message: associate.message, type:associate.type })


        //MANDAR CRIAR A ASSOCIAÇÃO DA MÁTERIA COM O CURSO
       await createAssociateSubjectCourse(
            subjectName,
            courseName
        )
       
        return res.status(201).json({message:'Matéria foi associada ao curso com sucesso',type:'success'}) 
    } catch (error) {
        return res.status(404).json({message:'Tivemos um erro ao associar a matéria ao curso',type:'error'})
    }

}

// LISTAR TODOS OS NOMES DAS MATERIAS DE UM CURSO
export const getAllSubject = async(req,res)=>{
    const {courseName} = req.body
    
    try {
        const list = await getSubject(courseName)
        return res.status(201).json(list)
    } catch (error) {
        return res.status(404).json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
    }
}


//OBRIGATORIEDADE DA MATERIA
export const subjectMandatory = async (req, res) => {

    const { subjectName, preRequisite } = req.body
    
    try {
        // VALIDAR OS DADOS RECEBIDOS
        const message = await checksubjects(subjectName, preRequisite)
        if (message) 
           return res.status(400).json(message)
        
  
        await createSubjectMandatory(
            subjectName,
            preRequisite
        )

        return res.status(201).json({message:`O pre requisito para a matéria ${subjectName} foi criado com sucesso`,type:'success'})
        
    } catch (error) {
        return res.status(404).json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
    }
}


