import bcrypt from "bcryptjs"
import { createProfs } from "../repository/prof.Repository";


export const create = async(req,res)=>{
   
    let {prof_name,prof_status,prof_email,prof_password,prof_phone,departamentId}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
     
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