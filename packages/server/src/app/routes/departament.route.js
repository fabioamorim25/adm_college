import {
    create,
    edite,
    remove
} from "../controller/departament.controller";

import { signIn } from "../controller/auth.controller";

const departamentRoutes = app=>{
    app.post('/department/register', create)
    app.put('/editDepartament/:id', edite)
    app.delete('/removeDepartament/:id',remove)
    
    
    app.post('/SignIn',signIn);
    
    
    

    
}

export default departamentRoutes;