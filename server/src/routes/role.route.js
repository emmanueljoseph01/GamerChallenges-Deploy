import { Router } from 'express';
import { baseRoute } from './base.route.js';
import { Role } from '../models/index.model.js';

const router = Router();
router.use('/', baseRoute(Role));

export default router;
