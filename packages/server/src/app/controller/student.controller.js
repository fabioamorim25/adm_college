import bcrypt from 'bcryptjs'
import { createStudents } from "../repository/student.Repository";
import { studentValidation, validationStudent } from '../validations/student.validation';


export const create = async(req,res)=>{
   
    let {stu_name,stu_registration, stu_status,stu_period,stu_mother_name,stu_father_name,stu_phone,email,password,courseName}= req.body
    
    try {
        //VALIDAR OS DADOS RECEBIDOS
        let validationErrors;
        await studentValidation.validate({ stu_name,stu_registration, stu_status,stu_period,stu_mother_name,stu_father_name,stu_phone,email,password,courseName}, { abortEarly: false })
        .catch(validationError => {
            validationErrors = validationError.errors;
        })
        if (validationErrors){
            return res.status(400).json({ message: validationErrors, type: "error" });
        }
         
        // VALIDAR ALUNO
        const studentExists = await validationStudent(stu_name,email)
        if (studentExists) {
            return res.status(400).json({ message: studentExists.message, type: studentExists.type })
         }
        
        //CRIPTOGRAFAR A SENHA
        const hashPassword = await bcrypt.hash(password,10);
        password = hashPassword;
    
        //3° MANDAR CRIAR O STUDENT
        const student = await createStudents(
            stu_name,
            stu_registration,
            stu_status,
            stu_period,
            stu_mother_name,
            stu_father_name,
            stu_phone,
            email,
            password,
            courseName
        )
        
        return res.status(201).json({ message: student.message, type:student.type })
    } catch (error) {
        return res.status(404).json({ message: "Error no servidor. Por favor tente mais tarde", type: "error" })
    }
}