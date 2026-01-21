import { Router } from 'express';
import { baseRoute } from './base.route.js';
import { Participation } from '../models/index.model.js';

const router = Router();
router.use('/participations', baseRoute(Participation));

export default router;
