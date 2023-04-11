import express from 'express';
const router = express.Router();



//AUTENTICAÇÃO ALUNOS
router.post('/logIn')








module.exports= (app)=>{
    app.use('/student',router)
}