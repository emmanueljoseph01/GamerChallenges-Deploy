import { Router } from 'express';
import { baseRoute } from './base.route.js';
import { User } from '../models/index.model.js';

const router = Router();
router.use('/users', baseRoute(User));

export default router;
