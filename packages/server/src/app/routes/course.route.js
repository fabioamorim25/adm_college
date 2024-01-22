import { create, editar, getAllCourse, getInfoAllCourses} from "../controller/course.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";



const courseRoutes = app=>{


    // app.use(authTokenValidate)
    // app.use(roleAdmin)
        app.post('/course/register',authTokenValidate,roleAdmin, create)
        app.put('/course/edit',authTokenValidate,roleAdmin,editar)
        
        app.get('/getAllCourse',authTokenValidate,roleAdmin, getAllCourse)
        app.get('/infoCourses', authTokenValidate,roleAdmin, getInfoAllCourses)




    
}

export default courseRoutes;