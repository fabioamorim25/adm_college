import * as yup from "yup"


//VALIDAR DADOS RECEBIDOS NA CRIAÇÃO DO ENDEREÇO
export const addressValidation = yup.object({
    add_street:yup.string().required(),
    add_city:yup.string().required(),
    add_neighborhood:yup.string(),
    add_number:yup.string().required(),
    add_complement:yup.string(),
})

