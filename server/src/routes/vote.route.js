import express from 'express';
import {
  createVote,
  getAllVotes,
  getVoteById,
  updateVote,
  deleteVote
} from '../controllers/vote.controller.js';

const router = express.Router();

// Route pour créer un vote
router.post('/', createVote);

// Route pour récupérer tous les votes
router.get('/', getAllVotes);

// Route pour récupérer un vote par ID
router.get('/:id', getVoteById);

// Route pour mettre à jour un vote
router.put('/:id', updateVote);

// Route pour supprimer un vote
router.delete('/:id', deleteVote);

export default router;
