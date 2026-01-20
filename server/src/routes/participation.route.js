import express from 'express';
import {
  createParticipation,
  getAllParticipations,
  getParticipationById, // Vérifie que cette ligne est présente
  updateParticipation, // Vérifie que cette ligne est présente
  deleteParticipation
} from '../controllers/participation.controller.js';

const router = express.Router();

// Routes CRUD
router.post('/', createParticipation);          // POST /participations
router.get('/', getAllParticipations);          // GET /participations
router.get('/:id', getParticipationById);       // GET /participations/:id
router.put('/:id', updateParticipation);       // PUT /participations/:id
router.delete('/:id', deleteParticipation);    // DELETE /participations/:id

export default router;


