import { prisma } from "../../lib/prismaClient"

// VALIDAR SE EXISTE OUTRO CURSO COM O MESMO NOME
export const courseUnic = async (cou_name) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        cou_name
      }
    })
    if (course)
      return { message: 'Já existe esse nome para um curso', type: 'error' }

  } catch (error) {
    return { message: 'Erro na validação do nome do curso', type: 'error' }
  } finally {
    await prisma.$disconnect();
  }
}