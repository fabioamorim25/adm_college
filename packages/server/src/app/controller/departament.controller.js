import bcrypt from "bcryptjs"

import { 
    createDepartament,
    deleteDepartament,
    editDepartament,
} from "../repository/departament.Repository";

import {
    checkDepartmentId,
    departamentValidation,
    existingDepartment
} from "../validations/departament.validation"




export const create = async(req,res)=>{
   
    let {dep_name,email,password}= req.body
   

    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        await departamentValidation.validate(req.body)
       
        // 2°VALIDAR SE JA EXISTE UM CADASTRO DE UM DEPARTAMENTO
        const existingdepartment = await existingDepartment()
        if (existingdepartment) {
            return res.status(400).json({ msg: 'Já existe um departamento cadastrado no sistema' });
        }
           
       
        //3° CRIPTOGRAFAR A SENHA
        const hashPassword = await bcrypt.hash(password,10);
        password = hashPassword;
        
        //4° MANDAR CRIAR O DEPARTAMENTO
        const departament = await createDepartament(
            dep_name,
            email,
            password
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
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;

        //3°PASSAR OS DADOS PARA O EDITOR
        const departament = await editDepartament(req.params.id, req.body)

        return res.status(200).json(departament)
    } catch (error) {
        return res.status(404).json(error)
    }
}

export const remove = async(req,res)=>{
    const {id}= req.params;
    try {
        
        //1°VALIDAR SE JA EXISTE UM CADASTRO DE UM DEPARTAMENTO
       const checkDepartment =  await checkDepartmentId(id)
        if(!checkDepartment)
            return res.status(400).json({ msg: 'Esse departamento não existe'})
        
        //2° REMOVER O DEPARTAMENTO
        const removeDepartament = await deleteDepartament(id)
        return res.status(200).json({msg:"Departamento apagado com sucesso"})
    } catch (error) {
        return res.status(404).json(error)
    }
}