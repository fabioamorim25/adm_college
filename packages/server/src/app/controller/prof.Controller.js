import bcrypt from "bcryptjs"
import { format } from "date-fns"


import {
    assignSubjectTeacher,
    createProfs,
    getDataProf,
    getListProfs
} from "../repository/prof.Repository";
import {
    checkAssociateSubjectProf,
    checkSubjectProfName, profEmailUnique, profValidation
} from "../validations/prof.validation";


export const create = async (req, res) => {

    let { prof_name, prof_status, email, password, prof_phone, departamentId } = req.body

    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        let validationErrors;
        await profValidation.validate({ prof_name, prof_status, email, password, prof_phone, departamentId }, { abortEarly: false })
            .catch(validationError => {
                validationErrors = validationError.errors;
            })
        if (validationErrors)
            return res.status(400).json({ message: validationErrors, type: "error" });


        //2° VALIDAR SE JA EXISTE ESSE PROF
        const emailUnique = await profEmailUnique(email, prof_name)
        if (emailUnique) {
            return res.status(400).json({ message: emailUnique.message, type: emailUnique.type })
        }

        //2° CRIPTOGRAFAR A SENHA
        const hashPassword = await bcrypt.hash(password, 10);
        password = hashPassword;

        //3° MANDAR CRIAR O DEPARTAMENTO
        await createProfs(
            prof_name,
            prof_status,
            email,
            password,
            prof_phone,
            departamentId
        )

        return res.status(201).json({ message: "Professor salvo com sucesso", type: "success" })

    } catch (error) {
        return res.status(404).json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
    }
}

//DEFINIR MATERIA PARA O PROFESSOR
export const subjectPorf = async (req, res) => {
    const { profName, subject } = req.body;

    try {
        //1°VALIDAR SE JA EXISTE UM PROFESSOR OU MATERIA
        const validadeName = await checkSubjectProfName(profName, subject)
        if (validadeName) {
            return res.status(400).json({ msg: validadeName.message })
        }

        // 2°VALIDAR SE JÁ EXISTE A ASSOCIAÇÃO 
        const validadeAssociate = await checkAssociateSubjectProf(profName, subject)
        if (validadeAssociate) {
            return res.status(400).json({ msg: validadeAssociate.message })
        }

        //3° PASSAR MATERIA PARA O PROFESSOR
        const assign = await assignSubjectTeacher(
            profName,
            subject
        )

        return res.status(201).json({ message: assign.message, type: 'success' })
    } catch (error) {
        return res.status(404).json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
    }
}

export const listProf = async (req, res) => {
    try {
        const profs = await getListProfs()

        const data = await profs.map(prof => {
            return {
                ...prof, // Mantém todos os outros campos do professor
                createdAt: format(prof.createdAt, 'dd-MM-yyyy HH:mm')
            };
        })

        return res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({ message: "Error na listagem dos professores", type: "error" })
    }

}

export const getProf = async (req, res) => {
    const profId = await req.query.id;

    try {

        const prof = await getDataProf(profId)
        return res.status(200).json(prof)
    } catch (error) {
        return res.status(404).json({ message: "Error nos dados do professore", type: "error" })
    }
}

