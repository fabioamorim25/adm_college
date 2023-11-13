import {
    createAddress, editAddress
} from "../repository/address.Repository";
import {
    addressValidation, uniqueAddress
} from "../validations/address.validation";
import {
    validationStudentName
} from "../validations/student.validation";


export const create = async (req, res) => {

    let { add_street, add_city, add_neighborhood, add_number, add_complement, studentName } = req.body

    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        let validationErrors;
        await addressValidation.validate({ add_street, add_city, add_neighborhood, add_number, add_complement, studentName }, { abortEarly: false })
            .catch(validationError => {
                validationErrors = validationError.errors;
            })
        if (validationErrors) {
            return res.status(400).json({ message: validationErrors, type: "error" });
        }


        //2° VALIDAR SE EXISTE O ALUNO
        const student = await validationStudentName(studentName)
        if(student)
            return res.status(400).json({ message:student.message, type:student.type})

        //3° VALIDAR: DEVE SER UM ENDEREÇO UNICO (Já existe um endereço cadastrado para o aluno)
        const existsAddresStudent = await uniqueAddress(add_street, studentName)
        if (existsAddresStudent) 
            return res.status(400).json({ message: existsAddresStudent.message, type: existsAddresStudent.type })
        

        //MANDAR CRIAR O ADDRESS
        await createAddress(
            add_street,
            add_city,
            add_neighborhood,
            add_number,
            add_complement,
            studentName
        )

        return res.status(201).json({ message: 'O endereço foi criado com sucesso', type: 'success' })

    } catch (error) {
        return res.status(404).json({message:'Tivemos um erro ao criar o endereço',type:'error'})
    }
}

export const edite = async (req, res) => {

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