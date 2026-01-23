import { Router } from 'express';
import { baseRoute } from './base.route.js';
import { User } from '../models/index.model.js';

const router = Router();
router.use('/', baseRoute(User));

export default router;
