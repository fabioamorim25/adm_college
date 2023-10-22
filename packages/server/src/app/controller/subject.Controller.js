import { createSubjects, createSubjectMandatory, createAssociateSubjectCourse, getSubject } from "../repository/subject.Repository";
import {checksubjects, nameUniqueSubject, namesAssociateSubjectCourse, subjectUnic, subjectValidation} from '../validations/subject.validation'

export const create = async(req,res)=>{
   
    let {sub_name,sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory, departamentId}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        await subjectValidation.validate(req.body)

        // 2° VALIDAR SE O NOME DA MÁTERIA JÁ EXISTE
        const nameUnique = await subjectUnic(sub_name)
        if (nameUnique) {
            return res.status(400).json({ message: nameUnique.message, type:nameUnique.type })
         }

        //3° MANDAR CRIAR A MÁTERIA
        await createSubjects(
            sub_name,
            sub_shift,
            sub_start_time,
            sub_stop_time,
            sub_description,
            sub_mandatory,
            departamentId
        ) 
        
        return res.status(201).json({message:'Máteria foi cadastrada com sucesso',type:'success'})
    
    } catch (error) {
        return res.status(404).json({message:'Tivemos um erro ao cadastra a máteria',type:'error'})
    }
}

// ASSOCIAR UMA MÁTERIA A UM CURSO
export const associateSubjectCourse = async(req,res)=>{
    const {subjectName,courseName} = req.body

    try {
        //VALIDAR SE O NOME DA MÁTERIA EXISTE
        const uniqueName = await nameUniqueSubject(subjectName)
        if (uniqueName)
            return res.status(400).json({ message: uniqueName.message, type:uniqueName.type })

        // VALIDAR SE JÁ EXISTE A ASSOCIAÇÃO ENTRE A MÁTERIA E O CURSO
        const associate = await namesAssociateSubjectCourse(subjectName,courseName)
        if (associate)
            return res.status(400).json({ message: associate.message, type:associate.type })


        //MANDAR CRIAR A ASSOCIAÇÃO DA MÁTERIA COM O CURSO
       await createAssociateSubjectCourse(
            subjectName,
            courseName
        )
       
        return res.status(201).json({message:'Máteria foi associada ao curso com sucesso',type:'success'}) 
    } catch (error) {
        return res.status(404).json({message:'Tivemos um erro ao associar a máteria ao curso',type:'error'})
    }

}


//OBRIGATORIEDADE DA MÁTERIA
export const subjectMandatory = async (req, res) => {

    const { subjectId, Id_PreRequisite } = req.body

    try {
        // VALIDAR OS DADOS RECEBIDOS
        const message = await checksubjects(subjectId, Id_PreRequisite)
        if (message) {
           return res.status(400).json({ msg: message })
        }
        else {
            const mandayory = await createSubjectMandatory(
                subjectId,
                Id_PreRequisite
            )

            return res.status(201).json(mandayory)
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}


// LISTAR TODOS OS NOMES DAS MÁTERIAS DO SISTEMA
export const getAllSubject = async(req,res)=>{
    try {
        const list = await getSubject()
        return res.status(201).json(list)
    } catch (error) {
        return res.status(404).json(error)
    }
}