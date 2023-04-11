import express from 'express';
const router = express.Router();



//AUTENTICAÇÃO PROFESSOR
router.post('/logIn')







module.exports= (app)=>{
    app.use('/prof',router)
}