import { createSubjects } from "../repository/subject.Repository";


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