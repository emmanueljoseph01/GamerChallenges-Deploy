import express from 'express';
import {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame
} from '../controllers/game.controller.js';

const router = express.Router();

// Route pour créer un jeu
router.post('/', createGame);

// Route pour récupérer tous les jeux
router.get('/', getAllGames);

// Route pour récupérer un jeu par ID
router.get('/:id', getGameById);

// Route pour mettre à jour un jeu
router.put('/:id', updateGame);

// Route pour supprimer un jeu
router.delete('/:id', deleteGame);

export default router;
