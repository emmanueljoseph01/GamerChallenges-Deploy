import express from 'express';
import {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge
} from '../controllers/challenge.controller.js';

const router = express.Router();

// Création d'un défi
router.post('/', createChallenge);

// Récupération de tous les défis
router.get('/', getAllChallenges);

// Récupération d'un défi par ID
router.get('/:id', getChallengeById);

// Mise à jour d'un défi
router.put('/:id', updateChallenge);

// Suppression d'un défi
router.delete('/:id', deleteChallenge);

export default router;
