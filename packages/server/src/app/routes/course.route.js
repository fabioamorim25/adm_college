import { create, getAllCourse } from "../controller/course.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";



const courseRoutes = app=>{


    // app.use(authTokenValidate)
    // app.use(roleAdmin)
        app.post('/course/register',authTokenValidate,roleAdmin, create)
        app.get('/getAllCourse',authTokenValidate,roleAdmin,getAllCourse)





    
}

export default courseRoutes;