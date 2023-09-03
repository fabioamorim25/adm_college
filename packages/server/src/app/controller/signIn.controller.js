import { prisma } from '../../lib/prismaClient'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'



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
          id:true,
          stu_name:true,
          password: true,
        }
      }),
      prisma.prof.findUnique({
        where: {
          email: email
        },
        select:{
          id:true,
          prof_name:true,
          password: true,
        }
      }),
      prisma.departament.findUnique({
        where: {
          email: email
        },
        select:{
          id:true,
          dep_name:true,
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
  

    //VALIDAR A SENHA DO USER(comparar senha recebida com a do db)
    if(!await bcrypt.compare(password, user.password)){
      return res.status(400).json({msg:"Password invalido"})
    }

    // CRIAR UM TOKEN PARA O USER E ENVIAR PARA O FRONT
    const token = jwt.sign({id:user.id},process.env.SECRET,{
      expiresIn: process.env.EXPIRE_TOKEN //1 dia
    })








    return res.status(200).json({user,token});
    
  } catch (error) {
    return res.status(404).json(error)
  }

}