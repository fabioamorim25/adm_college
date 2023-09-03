import {
  consultDocument
} from '../repository/auth.Repository'
import {
  validatePassword
} from '../validations/auth.validation'
import { generateToken } from '../utils/auth.token'




export const signIn = async (req, res) => {

  const { email, password } = req.body

  try {
    //CONSULTA NAS TABELAS
    const result = await consultDocument(email)

    //VALIDAR SE EXISTE ALGUM USER NO OBJETO
    if (result.every(item => item === null)) {
      return res.status(400).json({msg: "O usuário não existe"});
    }

    //FILTRA O OBJETO E RETORNAR APENAS OS DADOS DO USER
    const user = result.filter(item => item !== null)[0];
  

    //VALIDAR A SENHA DO USER(comparar senha recebida com a do db)
    const validate = await validatePassword(password, user.password);
    if (validate.error)
      return res.status(400).json({ msg: validate.msg });
    

    // CRIAR UM TOKEN PARA O USER
    const token = generateToken(user.id)

    return res.status(200).json({user,token});    
  } catch (error) {
    return res.status(404).json(error)
  }
}