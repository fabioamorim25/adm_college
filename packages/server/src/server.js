import dotenv from 'dotenv'
import app from './app/app';
import sequelize from './database/index'

dotenv.config();



app.listen(process.env.PORT, ()=>{
    console.log('servidor rodando')
})