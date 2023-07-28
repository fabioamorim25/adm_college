import {PrismaClient} from '@prisma/client'


export const prisma = new PrismaClient({
    log:['query','error','info','warn']
})

async function conection(){
    try {
        await prisma.$connect()
        return console.log('Conexão com o banco estabelecida')
    } catch (error) {
        return console.error(error)
    }
}
conection()