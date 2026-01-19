import express from 'express';
import {
  createParticipation,
  getAllParticipations,
  getParticipationById,
  updateParticipation,
  deleteParticipation
} from '../controllers/participation.controller.js';

const router = express.Router();

router.post('/', createParticipation);
router.get('/', getAllParticipations);
router.get('/:id', getParticipationById);
router.put('/:id', updateParticipation);
router.delete('/:id', deleteParticipation);

export default router;

