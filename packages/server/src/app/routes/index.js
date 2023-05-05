import {Router} from 'express';

import {departamentRoutes} from './departamentRoutes';
import { profRoutes } from './profRoutes';
import { studentRoutes } from './studentRoutes';

const router = Router();

router.use('/department', departamentRoutes);
router.use('/prof', profRoutes);
router.use('/student', studentRoutes)



export{router}