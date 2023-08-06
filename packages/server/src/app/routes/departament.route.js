import { create} from "../controller/departament.controller";

const departamentRoutes = app=>{
    app.post('/department/register', create)






    
}

export default departamentRoutes;