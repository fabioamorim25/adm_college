import {
    create,
    edite 
} from "../controller/address.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin, roleAdminStudent } from "../middlewares/roleAccessControl";

const addressRoutes = app=>{

    // app.use(authTokenValidate);
        app.post('/createAddress',authTokenValidate,roleAdmin,create);
        app.put('/editeAddress/:id',authTokenValidate,roleAdminStudent, edite);



    
}

export default addressRoutes;