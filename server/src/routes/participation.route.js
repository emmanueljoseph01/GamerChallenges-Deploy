import express from 'express';
import {
  createParticipation,
  getAllParticipations,
  getParticipationById,
  updateParticipation,
  deleteParticipation
} from '../controllers/participation.controller.js';

const router = express.Router();

// Route pour créer une participation
router.post('/', createParticipation);

// Route pour récupérer toutes les participations
router.get('/', getAllParticipations);

// Route pour récupérer une participation par ID
router.get('/:id', getParticipationById);

// Route pour mettre à jour une participation
router.put('/:id', updateParticipation);

// Route pour supprimer une participation
router.delete('/:id', deleteParticipation);

export default router;
