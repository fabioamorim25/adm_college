import * as yup from "yup"


//VALIDAR DADOS RECEBIDOS NA CRIAÇÃO DO ENDEREÇO
export const addressValidation = yup.object({
    add_street: yup.string().required('O campo add_street é obrigatório'),
    add_city: yup.string().required('O campo add_city é obrigatório'),
    add_neighborhood: yup.string(),
    add_number: yup.string().required('O campo add_number é obrigatório'),
    add_complement: yup.string(),
});

