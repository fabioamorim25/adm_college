import {Router} from 'express';
import AuthDepartament from '../controllers/DepartamentController/AuthDepartament'


const departamentRoutes = Router();



//AUTENTICAÇÃO DEPARTAMENTO
departamentRoutes.post('/register', AuthDepartament.Register);







export {departamentRoutes}
