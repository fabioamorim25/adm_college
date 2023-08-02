import departamentRoutes from "./departament.route";
import courseRoutes from "./course.route";
import profRoutes from "./prof.route";
import subjectRoutes from "./subject.route";
import studentRoutes from "./student.route";
import addressRoutes from "./address.route";


const routes = (app)=>{
    departamentRoutes(app)
    courseRoutes(app)
    profRoutes(app)
    subjectRoutes(app)
    studentRoutes(app)
    addressRoutes(app)
}

export default routes;