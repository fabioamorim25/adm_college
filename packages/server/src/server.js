import dotenv from 'dotenv'
dotenv.config();

import app from './app/app';
import { prisma } from './lib/prismaClient';





app.listen(process.env.PORT, ()=>{
    console.log('servidor rodando')
})