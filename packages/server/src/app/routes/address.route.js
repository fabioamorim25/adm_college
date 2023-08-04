import { create } from "../controller/address.Controller";

const addressRoutes = app=>{
    app.post('/createAddress', create)
    




    
}

export default addressRoutes;