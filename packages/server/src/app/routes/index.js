import departamentRoutes from "./departament.route";
import courseRoutes from "./course.route";
import profRoutes from "./prof.route";


const routes = (app)=>{
    departamentRoutes(app)
    courseRoutes(app)
    profRoutes(app)
}

export default routes;