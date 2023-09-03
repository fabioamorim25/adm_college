import { prisma } from '../../lib/prismaClient'
import bcrypt from "bcryptjs"

export const signIn = async (req, res) => {

  const { email, password } = req.body

  try {

    //CONSULTA NAS TABELAS
    const result = await Promise.all([
      prisma.student.findUnique({
        where: {
          email: email
        },
        select:{
          password: true,
        }
      }),
      prisma.prof.findUnique({
        where: {
          email: email
        },
        select:{
          password: true,
        }
      }),
      prisma.departament.findUnique({
        where: {
          email: email
        },
        select:{
          password: true,
        }
      })
    ]);

    //VALIDAR SE EXISTE ALGUM USER NO OBJETO
    if (result.every(item => item === null)) {
      return res.status(400).json({msg: "O usuário não existe"});
    }


    //FILTRA O OBJETO E RETORNAR APENAS OS DADOS DO USER
    const user = result.filter(item => item !== null)[0];
  

    //VALIDAR A SENHA DO USER
    if(!await bcrypt.compare(password, user.password)){
      return res.status(400).json({msg:"Password invalido"})
    }

    return res.status(200).json(user);
    
  } catch (error) {
    return res.status(404).json(error)
  }

}