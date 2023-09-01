import { createCourses } from "../repository/course.Repository";


export const create = async(req,res)=>{
   
    let {cou_name,departamentId}= req.body
    
    try {
        //MANDAR CRIAR O DEPARTAMENTO
        const course = await createCourses(
            cou_name,
            departamentId
        )
        
        return res.status(201).json(course)
    
    } catch (error) {
        return res.status(404).json(error)
    }
}