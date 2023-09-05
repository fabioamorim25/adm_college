import {
    create,
    edite,
    remove
} from "../controller/departament.controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";


const departamentRoutes = app=>{

    app.post('/department/register', create)

    
    app.use(authTokenValidate)
    app.use(roleAdmin)
        app.put('/editDepartament/:id', edite)
        app.delete('/removeDepartament/:id',remove)
        
        
    


     
}

export default departamentRoutes;