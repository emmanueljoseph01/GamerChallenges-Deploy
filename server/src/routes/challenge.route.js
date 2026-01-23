import { Router } from 'express';
import { baseRoute } from './base.route.js';
import { Challenge } from '../models/index.model.js';



const router = Router();
router.use('/', baseRoute(Challenge));



export default router;

