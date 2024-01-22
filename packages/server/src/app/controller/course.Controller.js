import {format} from "date-fns"

import { createCourses, editCourses, getCourse, infoCourses } from "../repository/course.Repository";
import { courseUnic } from "../validations/course.validation";

// CRIAR UM DOCUMENTO DO CURSO
export const create = async (req, res) => {

    let { cou_name, departamentId } = req.body

    // VALIDAR O NOME DO CURSO (Deve ser unico)
    const nameUnique = await courseUnic(cou_name)

    if (nameUnique)
        return res.status(400).json({ message: nameUnique.message, type: nameUnique.type })

    try {
        //MANDAR CRIAR O CURSO
        const course = await createCourses(
            cou_name,
            departamentId
        )

        return res.status(201).json({ message: course.message, type: course.type })

    } catch (error) {
        return res.status(404).json({ message: 'Tivemos um erro no banco de dados', type: 'error' })
    }
}

// EDITAR UM DOCUMENTO CURSO
export const editar = async (req, res) => {

    let { id, cou_name, departamentId } = req.body

    // VALIDAR O NOME DO CURSO (Deve ser unico)
    const nameUnique = await courseUnic(cou_name)
    if (nameUnique)
        return res.status(400).json({ message: nameUnique.message, type: nameUnique.type })

    try {
        //MANDAR EDITAR O CURSO
        const edit = await editCourses(
            id,
            cou_name,
            departamentId
        )

        return res.status(201).json({ message: edit.message, type: edit.type })

    } catch (error) {
        return res.status(404).json({ message: 'Tivemos um erro ao criar o curso', type: 'error' })
    }
}

// LISTAR TODOS OS NOMES DE CURSOS DO SISTEMA
export const getAllCourse = async (req, res) => {
    try {
        const list = await getCourse()
        return res.status(201).json(list)
    } catch (error) {
        return res.status(400).json()
    }
}
//LISTAR INFORMAÇÕES DE TODOS OS CURSOS
export const getInfoAllCourses = async (req, res) => {
    try {

        const info = await infoCourses()

        // Manipular itens
        const handlingInfo = info.map((curso) => {
            const { id, cou_name, updatedAt, _count } = curso;

            function setStatus() {
                if (_count.Course_Subject > 0)
                    return true
                return false
            }

            return {
                id,
                cou_name,
                updatedAt:format(updatedAt, 'dd-MM-yyyy HH:mm'),
                amount: _count.Course_Subject,
                status: setStatus(),
            };
        });

        return res.status(201).json(handlingInfo)
    } catch (error) {
        return res.status(404).json()
    }
}
