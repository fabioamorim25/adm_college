import { create } from "../controller/student.controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";

const studentRoutes = app=>{
    
    
    app.use(authTokenValidate)
    app.use(roleAdmin)
        app.post('/student/register', create)



    
}

export default studentRoutes;