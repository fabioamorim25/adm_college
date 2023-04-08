const express = require('express');
const router = express.Router();

//AUTENTICAÇÃO ALUNOS
router.post('/logIn')

//AUTENTICAÇÃO PROFESSOR
router.post('/logIn')


//AUTENTICAÇÃO DEPARTAMENTO
router.post('/logIn')


module.exports= (app)=>{
    app.use('/auth',router)
}