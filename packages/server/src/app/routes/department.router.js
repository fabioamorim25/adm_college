import express from 'express';
const router = express.Router();


//AUTENTICAÇÃO DEPARTAMENTO
router.post('/logIn')
router.post('/register/')






module.exports= (app)=>{
    app.use('/department',router)
}