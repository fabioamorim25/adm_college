import {
    create,
    edite 
} from "../controller/address.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin, roleAdminStudent } from "../middlewares/roleAccessControl";

const addressRoutes = app=>{

    app.use(authTokenValidate)
        app.post('/createAddress',roleAdmin,create)
        app.put('/editeAddress/:id',roleAdminStudent, edite)



    
}

export default addressRoutes;