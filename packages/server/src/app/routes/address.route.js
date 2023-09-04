import {
    create,
    edite 
} from "../controller/address.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";

const addressRoutes = app=>{

    app.use(authTokenValidate)
        app.post('/createAddress', create)
        app.put('/editeAddress/:id', edite)




    
}

export default addressRoutes;