import { 
  authBackFront,
  signIn, 
} from "../controller/auth.controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";


const authRoutes = app=>{
    
 app.post('/SignIn',signIn);
  


   app.use(authTokenValidate);
        app.get('/authApi', authBackFront);
   

}

export default authRoutes;