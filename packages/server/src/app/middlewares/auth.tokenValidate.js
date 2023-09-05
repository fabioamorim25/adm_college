import jwt from "jsonwebtoken"


//MIDDOWARES PARA VALIDAR O TOKEN DO USUÁRIO
export default (req, res, next) => {

     //pegar os dados que estão no header do usuário
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "O token não foi encontrado" })
    }
   

    // VERIFICAR SE O FORMATO DO TOKEN ESTA CERTO 
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: "Token error" })
    }

   
    // VALIDAR SE TEM O NOME (Bearer) NA REQUISIÇÃO
    const [scheme, token] = parts;
    if (! /^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: "Token mal formatado" })
    }

    try {

        // VALIDAR TOKEN COM O SEGREDO
        jwt.verify(token, process.env.SECRET,(error,decoded)=>{
            if(error){  
                return res.status(401).json({ error: "Token invalido" });
            }
        
            req.userId = decoded.id//pegar o id do user logado
         
            return next();
        })
    
    } catch (error) {
        return res.status(400).json({ error: "Falha na validação do token" })
    }
}