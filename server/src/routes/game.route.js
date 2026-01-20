import express from 'express';
import {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame
} from '../controllers/game.controller.js';

const router = express.Router();

<<<<<<< HEAD
router.post('/', createGame);
router.get('/', getAllGames);
router.get('/:id', getGameById);
router.put('/:id', updateGame);
=======
// Route pour créer un jeu
router.post('/', createGame);

// Route pour récupérer tous les jeux
router.get('/', getAllGames);

// Route pour récupérer un jeu par ID
router.get('/:id', getGameById);

// Route pour mettre à jour un jeu
router.put('/:id', updateGame);

// Route pour supprimer un jeu
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
router.delete('/:id', deleteGame);

export default router;
