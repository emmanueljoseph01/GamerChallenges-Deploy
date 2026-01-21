import { Router } from 'express';
import { baseRoute } from './base.route.js';
import { Game } from '../models/index.model.js';

const router = Router();
router.use('/games', baseRoute(Game));

export default router;
