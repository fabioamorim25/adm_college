import {
    create,
    getProf,
    listProf,
    subjectPorf
} from "../controller/prof.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";

const profRoutes = app => {


    app.post('/prof/register', authTokenValidate, roleAdmin, create)
    app.post('/assignSubjectProf', authTokenValidate, roleAdmin, subjectPorf)

    app.get('/listInfoProf', authTokenValidate, roleAdmin, listProf)
    app.post('/getProf', authTokenValidate, roleAdmin, getProf)
    


}

export default profRoutes;