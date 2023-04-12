import dotenv from 'dotenv'
import app from './app/app';
dotenv.config();




app.listen(process.env.PORT, ()=>{
    console.log('servidor rodando')
})