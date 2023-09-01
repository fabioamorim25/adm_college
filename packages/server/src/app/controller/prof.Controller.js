import bcrypt from "bcryptjs"
import {
    assignSubjectTeacher, 
    createProfs
} from "../repository/prof.Repository";
import { 
    checkSubjectProfId, profValidation 
} from "../validations/prof.validation";


export const create = async(req,res)=>{
   
    let {prof_name,prof_status,prof_email,prof_password,prof_phone,departamentId}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        await profValidation.validate(req.body)
        //2° CRIPTOGRAFAR A SENHA
        const hashPassword = await bcrypt.hash(prof_password,10);
        prof_password = hashPassword;
        
        //3° MANDAR CRIAR O DEPARTAMENTO
        const prof = await createProfs(
            prof_name,
            prof_status,
            prof_email,
            prof_password,
            prof_phone,
            departamentId
        )
        
        return res.status(201).json(prof)
    
    } catch (error) {
        return res.status(404).json(error)
    }
}

//DEFINIR MATERIA PARA O PROFESSOR
export const subjectPorf = async (req, res) => {
    const { profId, subjectId } = req.body;

    try {
        //1°VALIDAR SE JA EXISTE UM PROFESSOR OU MATERIA
        const message = await checkSubjectProfId(profId, subjectId)
        if (message) {
            res.status(400).json({ msg: message })
        }
        else {
            //2° PASSAR MATERIA PARA O PROFESSOR
            const assign = await assignSubjectTeacher(
                profId,
                subjectId
            )
            return res.status(201).json(assign)
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}