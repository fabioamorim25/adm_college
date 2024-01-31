import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
    createSubjects,
    createSubjectMandatory,
    createAssociateSubjectCourse,
    getSubjectsName,
    getNameSubjects,
    infoSubjects,
    updatedSubject,
    getDataSubject,
} from "../repository/subject.Repository";

import {
    checksubjects,
    nameUniqueSubject,
    namesAssociateSubjectCourse,
    subjectUnic,
    subjectValidation
} from '../validations/subject.validation'

export const create = async (req, res) => {

    let { sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory, departamentId } = req.body

    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        await subjectValidation.validate(req.body)

        // 2° VALIDAR SE O NOME DA MATÉRIA JÁ EXISTE
        const nameUnique = await subjectUnic(sub_name)
        if (nameUnique) {
            return res.status(400).json({ message: nameUnique.message, type: nameUnique.type })
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

        return res.status(201).json({ message: 'Matéria foi cadastrada com sucesso', type: 'success' })

    } catch (error) {
        return res.status(404).json({ message: 'Tivemos um erro ao cadastra a matéria', type: 'error' })
    }
}

// ASSOCIAR UMA MATERIA A UM CURSO
export const associateSubjectCourse = async (req, res) => {
    const { subjectName, courseName } = req.body

    try {
        //VALIDAR SE O NOME DA MATERIA EXISTE
        const uniqueName = await nameUniqueSubject(subjectName)
        if (uniqueName)
            return res.status(400).json({ message: uniqueName.message, type: uniqueName.type })

        // VALIDAR SE JÁ EXISTE A ASSOCIAÇÃO ENTRE A MATERIA E O CURSO
        const associate = await namesAssociateSubjectCourse(subjectName, courseName)
        if (associate)
            return res.status(400).json({ message: associate.message, type: associate.type })


        //MANDAR CRIAR A ASSOCIAÇÃO DA MÁTERIA COM O CURSO
        await createAssociateSubjectCourse(
            subjectName,
            courseName
        )

        return res.status(201).json({ message: 'Matéria foi associada ao curso com sucesso', type: 'success' })
    } catch (error) {
        return res.status(404).json({ message: 'Tivemos um erro ao associar a matéria ao curso', type: 'error' })
    }

}

// LISTAR TODOS OS NOMES DAS MATERIAS DE UM CURSO
export const allCourseSubjectNames = async (req, res) => {
    const { courseName } = req.body

    try {
        const list = await getSubjectsName(courseName)
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

        return res.status(201).json({ message: `O pre requisito para a matéria ${subjectName} foi criado com sucesso`, type: 'success' })

    } catch (error) {
        return res.status(404).json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
    }
}

// LISTAR TODAS AS MATÉRIAS
export const listNameSubjects = async (req, res) => {
    try {
        const subjects = await getNameSubjects()
        return res.status(201).json(subjects)
    } catch (error) {
        return res.status(404).json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
    }
}

// LISTAR INFORMAÇÕES DAS MATÉRIAS
export const listInfoSubjects = async (req, res) => {
    try {
        const info = await infoSubjects()

        const handlingInfo = info.map((subject) => {
            const { id, sub_name, sub_description, sub_shift, sub_start_time, sub_stop_time, updatedAt, _count } = subject;

            function setStatus() {
                if (_count.Course_Subject > 0)
                    return true
                return false
            }

            return {
                id,
                sub_name,
                sub_description,
                sub_shift,
                amount: _count.Course_Subject,
                sub_start_time: format(sub_start_time, 'EEEE, HH:mm', { locale: ptBR }),
                sub_stop_time: format(sub_stop_time, 'HH:mm'),
                updatedAt: format(updatedAt, 'dd-MM-yyyy HH:mm'),
                status: setStatus(),
            }
        })

        res.status(201).json(handlingInfo)
    } catch (error) {
        return res.status(404).json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
    }
}


// MOSTRA OS DADOS DA MATÉRIA ESCOLHIDA
export const getSubject = async (req, res) => {
    const subjectId = req.query.id;
    try {
        const subject = await getDataSubject(subjectId)

        const formatResponse = {
            sub_name: subject.sub_name,
            sub_description: subject.sub_description,
            sub_shift: subject.sub_shift,
            sub_start_time: format(subject.sub_start_time, "yyyy-MM-dd'T'HH:mm"),
            sub_stop_time: format(subject.sub_stop_time, "yyyy-MM-dd'T'HH:mm"),
            sub_mandatory: `${subject.sub_mandatory}`,
        }

        return res.status(200).json(formatResponse)
    } catch (error) {
        return res.status(200).json({ message: "Tivemos um erro na listagem dos dados", type: "error" })
    }
}
// EDITAR MATÉRIAS
export const editSubjects = async (req, res) => {
    const id = req.query.id;
    const { departamentId, numberModel, resultData } = req.body;


    try {
        async function filterDataNecessary(numberModel, resultData) {

            if (numberModel === 1) {
                const { sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory } = resultData;

                const nameUnique = await subjectUnic(sub_name)
                if (nameUnique) {
                    return { message: nameUnique.message, type: nameUnique.type }
                }
                return { sub_name, sub_shift, sub_start_time, sub_stop_time, sub_description, sub_mandatory };
            }

            // if (numberModel === 2) {
            //     const { subjectId, courseId } = data;
            //     return { subjectId, courseId };
            // }
            // if (numberModel === 3) {
            //   const {  } = data;
            //   return {  };
            // }

            return { message: "Dados invalidos", type: "error" }
        }

        const data = await filterDataNecessary(numberModel, resultData);
        if (data.type === "error") {
            return res.status(404).json(data)
        }

       
        const updated = await updatedSubject(id, numberModel, departamentId, data)

        return res.status(200).json(updated)
    } catch (error) {
        return res.status(404).json(error)
    }
}