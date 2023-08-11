import bcrypt from "bcryptjs"

import { 
    createDepartament,
    editDepartament,
} from "../repository/departament.Repository";

import {
    departamentValidation,
    existingDepartment
} from "../validations/departament.validation"




export const create = async(req,res)=>{
   
    let {dep_name,dep_email,dep_password}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        await departamentValidation.validate(req.body)

        // 2°VALIDAR SE JA EXISTE UM CADASTRO DE UM DEPARTAMENTO
        const existingdepartment = await existingDepartment()
        if(existingdepartment)
            return res.status(400).json({ msg: 'Já existe um departamento cadastrado no sistema' })


        //3° CRIPTOGRAFAR A SENHA
        const hashPassword = await bcrypt.hash(dep_password,10);
        dep_password = hashPassword;
        
        //4° MANDAR CRIAR O DEPARTAMENTO
        const departament = await createDepartament(
            dep_name,
            dep_email,
            dep_password
        )
        
        return res.status(201).json(departament)
    
    } catch (error) {
        return res.status(404).json(error)
    }
}

export const edite = async (req, res) => {
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        await departamentValidation.validate(req.body)

        //2° CRIPTOGRAFAR A SENHA
        const hashPassword = await bcrypt.hash(req.body.dep_password, 10);
        req.body.dep_password = hashPassword;

        //3°PASSAR OS DADOS PARA O EDITOR
        const departament = await editDepartament(req.params.id, req.body)

        return res.status(200).json(departament)
    } catch (error) {
        return res.status(404).json(error)
    }
}

