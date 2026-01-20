import express from 'express';
import {
  createParticipation,
  getAllParticipations,
<<<<<<< HEAD
  getParticipationById, // Vérifie que cette ligne est présente
  updateParticipation, // Vérifie que cette ligne est présente
=======
  getParticipationById,
  updateParticipation,
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
  deleteParticipation
} from '../controllers/participation.controller.js';

const router = express.Router();

<<<<<<< HEAD
// Routes CRUD
router.post('/', createParticipation);          // POST /participations
router.get('/', getAllParticipations);          // GET /participations
router.get('/:id', getParticipationById);       // GET /participations/:id
router.put('/:id', updateParticipation);       // PUT /participations/:id
router.delete('/:id', deleteParticipation);    // DELETE /participations/:id

export default router;


=======
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
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
