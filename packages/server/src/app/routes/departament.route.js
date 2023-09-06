import { authBackFront, signIn } from "../controller/auth.controller";
import {
    create,
    edite,
    remove
} from "../controller/departament.controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";


const departamentRoutes = app=>{

    app.post('/department/register', create)
    app.post('/SignIn',signIn);
    
    app.use(authTokenValidate)
    app.get('/authApi',authBackFront);
    app.use(roleAdmin)
        app.put('/editDepartament/:id', edite)
        app.delete('/removeDepartament/:id',remove)
        
        
    


     
}

export default departamentRoutes;