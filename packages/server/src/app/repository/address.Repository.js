import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createAddress = async (add_street, add_city, add_neighborhood, add_number, add_complement, studentName) => {

    const address = await prisma.address.create({
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
            id: true,
            add_street: true,
            add_city: true,
            add_neighborhood: true,
            add_number: true,
            add_complement: true,
            studentName: true
        }
    });

    return address;
}

//EDITAR DOCUMENTO DO ENDEREÇO
export const editAddress = async (id, data) => {
    const address = await prisma.address.findFirst({
        where: {
            studentId: id,
        },
    });

    if (address) {
        const updatedAddress = await prisma.address.update({
            where: {
                id: address.id,
            },
            data: data,
            select: {
                id: true,
                add_street: true,
                add_city: true,
                add_neighborhood: true,
                add_number: true,
                add_complement: true,
                studentId: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return updatedAddress;
    } else {
        return { msg: 'Registro não encontrado' }
    }
}