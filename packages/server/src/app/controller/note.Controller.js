import {
    createNotes
} from "../repository/note.Repository";

import { 
    existingStudentSubject, 
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
            res.status(400).json({ msg: message })
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