import departamentRoutes from "./departament.route";
import courseRoutes from "./course.route";
import profRoutes from "./prof.route";
import subjectRoutes from "./subject.route";
import studentRoutes from "./student.route";


const routes = (app)=>{
    departamentRoutes(app)
    courseRoutes(app)
    profRoutes(app)
    subjectRoutes(app)
    studentRoutes(app)
}

export default routes;