import { createAddress } from "../repository/address.Repository";


export const create = async(req,res)=>{
   
    let {add_street,add_city,add_neighborhood,add_number,add_complement,studentId}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
     
    
        //2° MANDAR CRIAR O ADDRESS
        const address = await createAddress(
            add_street,
            add_city,
            add_neighborhood,
            add_number,
            add_complement,
            studentId
        )
        
        return res.status(201).json(address)
    
    } catch (error) {
        return res.status(404).json(error)
    }
}