import {
    createNotes, editeNotes
} from "../repository/note.Repository";

import { 
    existingStudentSubject, 
    notes, 
    notesValidation
} from "../validations/note.validation";


export const create = async (req, res) => {

    const { av1, av2, av3, final_grade, attendance, student_count, studentId, subjectId } = req.body

    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        await notesValidation.validate({
            av1,
            av2,
            av3,
            final_grade,
            attendance,
            student_count,
            studentId,
            subjectId
        })
        //2°VALIDAR DOCUMENTOS   
        const message = await existingStudentSubject(studentId, subjectId)
        if (message) {
           return res.status(400).json({ msg: message })
        }
        else {
            //3° MANDAR CRIAR AS NOTAS
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
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}

export const edite = async (req,res)=>{

    const {av1,av2,av3,attendance,studentId,subjectId} = req.body;

    try {
        
        //1° VALIDAR OS DADOS RECEBIDOS
        await notes.validate({
            av1,
            av2,
            av3,
            attendance,
            studentId,
            subjectId
        })

        const studentNote = await editeNotes(
            studentId,
            subjectId,
            {
                av1,
                av2,
                av3,
                attendance
            }
        )

        return res.status(201).json(studentNote)

    } catch (error) {
        return res.status(404).json(error)
    }
}