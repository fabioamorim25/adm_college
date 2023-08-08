import { createSubjects, createSubjectMandatory } from "../repository/subject.Repository";
import {checksubjects} from '../validations/subject.validation'

export const create = async(req,res)=>{
   
    let {sub_name,sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory, departamentId}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
     
    
        //2° MANDAR CRIAR O DEPARTAMENTO
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
            res.status(400).json({ msg: message })
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