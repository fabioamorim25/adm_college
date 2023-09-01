import {
    createAddress, editAddress
} from "../repository/address.Repository";
import {
    addressValidation
} from "../validations/address.validation";
import { 
    validationStudent 
} from "../validations/student.validation";


export const create = async(req,res)=>{
   
    let {add_street,add_city,add_neighborhood,add_number,add_complement,studentId}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        await addressValidation.validate({
            add_street,
            add_city,
            add_neighborhood,
            add_number,
            add_complement
        })
        //2° VALIDAR SE EXISTE O ALUNO
        const student = await validationStudent(
            studentId
        )
        if(!student)
        return res.status(400).json({ msg: 'Não existe esse aluno' })
     
    
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

export const edite = async(req,res)=>{
       
    try {
      //1° VALIDAR OS DADOS RECEBIDOS
      await addressValidation.validate(req.body)

      //2°PASSAR OS DADOS PARA O EDITOR
      const address = await editAddress(req.params.id, req.body)

      return res.status(200).json(address)


    } catch (error) {
        return res.status(404).json(error)
    }
}