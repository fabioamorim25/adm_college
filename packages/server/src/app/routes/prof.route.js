import {
    create,
    editDataProf,
    getProf,
    getSubjectsAndSubjectsFromProf,
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
    app.put('/prof/edit', authTokenValidate, roleAdmin, editDataProf)
    app.post('/listSubjectsProf',authTokenValidate,roleAdmin,getSubjectsAndSubjectsFromProf)


}

export default profRoutes;