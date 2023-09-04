import {
    create,
    edite,
    remove
} from "../controller/departament.controller";

import { signIn } from "../controller/auth.controller";
import authTokenValidate from "../middlewares/auth.tokenValidate";



const departamentRoutes = app=>{
    
    app.post('/SignIn',signIn);
    app.post('/department/register', create)
    
    
    app.use(authTokenValidate)
        app.put('/editDepartament/:id', edite)
        app.delete('/removeDepartament/:id',remove)
        
   


    
}

export default departamentRoutes;