import { prisma } from '../../lib/prismaClient'

// CRIAR O DOCUMENTO E RETONAR O DADO
export const createAddress = async (add_street,add_city,add_neighborhood,add_number,add_complement,studentId) => {

    const address = await prisma.address.create({
        data: {
            add_street,
            add_city,
            add_neighborhood,
            add_number,
            add_complement,
            student: {
                connect: {
                    id: studentId
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
            studentId: true
        }
    });



    return address;
}
