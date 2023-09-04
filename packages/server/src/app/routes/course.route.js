import { create } from "../controller/course.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";



const courseRoutes = app=>{


    app.use(authTokenValidate)
        app.post('/course/register', create)





    
}

export default courseRoutes;