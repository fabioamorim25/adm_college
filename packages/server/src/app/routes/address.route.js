import { create, edite } from "../controller/address.Controller";

const addressRoutes = app=>{
    app.post('/createAddress', create)
    app.put('/editeAddress/:id', edite)




    
}

export default addressRoutes;