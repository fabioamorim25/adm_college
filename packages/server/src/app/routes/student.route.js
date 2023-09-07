import { create } from "../controller/student.controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";

const studentRoutes = app=>{
    
    
    app.post('/student/register',authTokenValidate,roleAdmin, create)



    
}

export default studentRoutes;