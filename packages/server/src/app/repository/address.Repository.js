import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createAddress = async (add_street, add_city, add_neighborhood, add_number, add_complement, studentName) => {
    try {
        await prisma.address.create({
            data: {
                add_street,
                add_city,
                add_neighborhood,
                add_number,
                add_complement,
                student: {
                    connect: {
                        stu_name: studentName
                    }
                }
            },
            select: {
                id: false,
                add_street: false,
                add_city: false,
                add_neighborhood: false,
                add_number: false,
                add_complement: false,
                studentName: true,
            }
        });

        return { message: 'O Curso foi criado com sucesso', type: 'success' }

    } catch (error) {
        return { message: 'Tivemos um erro ao criar o endereço', type: 'error' }
    } finally {
        await prisma.$disconnect();
    }
}

//EDITAR DOCUMENTO DO ENDEREÇO
export const editAddress = async (id, data) => {
    try {

        const address = await prisma.address.findFirst({
            where: {
                studentId: id,
            },
        });

        if (address) {
            await prisma.address.update({
                where: {
                    id: address.id,
                },
                data: data,
                select: {
                    id: false,
                    add_street: false,
                    add_city: false,
                    add_neighborhood: false,
                    add_number: false,
                    add_complement: false,
                    studentId: false,
                    createdAt: false,
                    updatedAt: false,
                },
            });

            return { message: 'O Endereço foi editado com sucesso', type: 'success' }
        } else
            return { message: 'Registro não encontrado', type: 'error' }

    } catch (error) {
        return { message: 'Tivemos um erro ao editar o endereço', type: 'error' }
    } finally {
        await prisma.$disconnect();
    }
}