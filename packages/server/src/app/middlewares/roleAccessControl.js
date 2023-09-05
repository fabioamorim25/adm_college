//MIDDOWARES PARA VALIDAR SE É UM DEPARTAMENTO QUE ESTA FAZENDO A REQUISIÇÃO
export const roleAdmin = (req, res, next) => {
    //pegar o role do user vindo da req no token
    const userRole = req.userRole;

    try {
   
        if (userRole === "ADMIN") {
         
            next()
        
        } else {
          res.status(403).json({"msg":"Acesso negado"})
        }
      
    } catch (error) {
        res.status(401).json({"msg":"Não autorizado"})
    }
}

//MIDDOWARES PARA VALIDAR SE É UM PROFESSOR QUE ESTA FAZENDO A REQUISIÇÃO
export const roleTeacher = (req, res, next) => {
    //pegar o role do user vindo da req no token 
    const userRole = req.userRole;

    try {
   
        if (userRole === "TEACHER") {
         
            next()
        
        } else {
          res.status(403).json({"msg":"Acesso negado"})
        }
      
    } catch (error) {
        res.status(401).json({"msg":"Não autorizado"})
    }
}


//MIDDOWARES PARA VALIDAR SE É UM ALUNO QUE ESTA FAZENDO A REQUISIÇÃO
export const roleStudent = (req, res, next) => {
    //pegar o role do user vindo da req no token
    const userRole = req.userRole;

    try {
   
        if (userRole === "STUDENT") {
         
            next()
        
        } else {
          res.status(403).json({"msg":"Acesso negado"})
        }
      
    } catch (error) {
        res.status(401).json({"msg":"Não autorizado"})
    }
}


//MIDDOWARES PARA VALIDAR SE É UM DEPARTAMENTO OU UM ALUNO QUE ESTA FAZENDO A REQUISIÇÃO
export const roleAdminStudent = (req, res, next) => {
    //pegar o role do user vindo da req no token
    const userRole = req.userRole;

    try {

        if (userRole === "ADMIN" || userRole === "STUDENT") {
         
            next()
        
        } else {
          res.status(403).json({"msg":"Acesso negado"})
        }
      
    } catch (error) {
        res.status(401).json({"msg":"Não autorizado"})
    }
}