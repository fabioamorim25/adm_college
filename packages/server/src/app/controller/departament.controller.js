import bcrypt from "bcryptjs"
import { createDepartament} from "../repository/departament.Repository";




export const create = async(req,res)=>{
   
    let {dep_name,dep_email,dep_password}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS

        //2° CRIPTOGRAFAR A SENHA
        const hashPassword = await bcrypt.hash(dep_password,10);
        dep_password = hashPassword;
        
        //3° MANDAR CRIAR O DEPARTAMENTO
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

