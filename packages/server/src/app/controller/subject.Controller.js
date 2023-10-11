import { createSubjects, createSubjectMandatory } from "../repository/subject.Repository";
import {checksubjects, subjectUnic, subjectValidation} from '../validations/subject.validation'

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

        //3° MANDAR CRIAR O DEPARTAMENTO
        const subject = await createSubjects(
            sub_name,
            sub_shift,
            sub_start_time,
            sub_stop_time,
            sub_description,
            sub_mandatory,
            departamentId
        )
        
        return res.status(201).json(subject)
    
    } catch (error) {
        return res.status(404).json(error)
    }
}

//OBRIGATORIEDADE DA MATERIA
export const subjectMandatory = async (req, res) => {

    const { subjectId, Id_PreRequisite } = req.body

    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        const message = await checksubjects(subjectId, Id_PreRequisite)
        if (message) {
           return res.status(400).json({ msg: message })
        }
        else {
            //2° 
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