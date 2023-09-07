import {
    create,
    edite,
    remove
} from "../controller/departament.controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";


const departamentRoutes = app=>{

    app.post('/department/register', create)
   
    
        .put('/editDepartament/:id',authTokenValidate,roleAdmin, edite)
        .delete('/removeDepartament/:id',authTokenValidate,roleAdmin, remove)
        
        
    


     
}

export default departamentRoutes;