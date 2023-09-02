import {
    create,
    edite,
    remove
} from "../controller/departament.controller";

import { signIn } from "../controller/signIn.controller";

const departamentRoutes = app=>{
    app.post('/department/register', create)
    app.put('/editDepartament/:id', edite)
    app.delete('/removeDepartament/:id',remove)
    
    
    app.post('/department/SignIn',signIn);
    
    
    

    
}

export default departamentRoutes;