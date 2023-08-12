import {
    create,
    edite,
    remove
} from "../controller/departament.controller";

const departamentRoutes = app=>{
    app.post('/department/register', create)
    app.put('/editDepartament/:id', edite)
    app.delete('/removeDepartament/:id',remove)
    
    
    
    
    

    
}

export default departamentRoutes;