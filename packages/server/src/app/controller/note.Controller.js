import { createNotes } from "../repository/note.Repository";


export const create = async(req,res)=>{
   
    let {av1,av2,av3,final_grade,attendance,student_count,studentId,subjectId}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
     
    
        //2° MANDAR CRIAR O ADDRESS
        const studentNote = await createNotes(
            av1,
            av2,
            av3,
            final_grade,
            attendance,
            student_count,
            studentId,
            subjectId
        )
        
        return res.status(201).json(studentNote)
    
    } catch (error) {
        return res.status(404).json(error)
    }
}