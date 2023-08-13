import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR OS DADOS (menos a senha)
export const createDepartament = async (dep_name, dep_email, dep_password) => {

  const departament = await prisma.departament.create({
    data: {
      dep_name,
      dep_email,
      dep_password
    },
    select: {
      id: true,
      dep_name: true,
      dep_email: true,
      dep_password: false
    }
  });


  return departament;
}

//EDITAR DOCUMENTO DO DEPARTAMENTO
export const editDepartament = async (id, data) => {
  const departaments = await prisma.departament.update({
    where: {
      id: id,
    },
    data: data,
    select: {
      id: true,
      dep_name: true,
      dep_email: true,
      dep_password: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return departaments;
}

//DELETAR O DEPARTAMENTO
export const deleteDepartament = async (id) => {
  try {
    const departament = await prisma.departament.delete({
      where: {
        id
      }
    })

    return departament
  } catch (error) {
    console.log(error)
  }
}

