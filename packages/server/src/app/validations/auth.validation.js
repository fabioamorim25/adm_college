import bcrypt from "bcryptjs"

//VALIDAR A SENHA DO USER(comparar senha recebida com a do db)
export const validatePassword = async (password, userPassword) => {
    if (!await bcrypt.compare(password, userPassword)) {
      return { error: true, msg: "Senha inválida" };
    }
    return { error: false };
  }
