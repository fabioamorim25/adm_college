import express from 'express';
import AuthDepartament from '../controllers/DepartamentController/AuthDepartament';




const router = express.Router();


//AUTENTICAÇÃO DEPARTAMENTO
router.post('/register', AuthDepartament.Register);








module.exports= (app)=>{
    app.use('/department',router)
}