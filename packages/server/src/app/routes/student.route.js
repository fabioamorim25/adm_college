import { create } from "../controller/student.controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";

const studentRoutes = app=>{
    
    
    app.use(authTokenValidate)
        app.post('/student/register', create)



    
}

export default studentRoutes;