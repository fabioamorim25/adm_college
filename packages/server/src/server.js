import dotenv from 'dotenv'
import app from './app/app';
import { prisma } from './lib/prisma';

dotenv.config();



app.listen(process.env.PORT, ()=>{
    console.log('servidor rodando')
})