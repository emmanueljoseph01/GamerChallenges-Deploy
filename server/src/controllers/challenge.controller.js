import { Challenge } from '../models/challenge.model.js';
import { handleError, handleSuccess } from './base.controller.js';

// Création d'un défi
export const createChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.create(req.body);
    handleSuccess(res, challenge, 201);
  } catch (error) {
    handleError(res, error);
  }
};

// Récupération de tous les défis
export const getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.findAll();
    handleSuccess(res, challenges);
  } catch (error) {
    handleError(res, error);
  }
};

// Récupération d'un défi par ID
export const getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findByPk(id);
    if (!challenge) {
      return res.status(404).json({ error: 'Défi non trouvé.' });
    }
    handleSuccess(res, challenge);
  } catch (error) {
    handleError(res, error);
  }
};

// Mise à jour d'un défi
export const updateChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Challenge.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'Défi non trouvé.' });
    }
    const updatedChallenge = await Challenge.findByPk(id);
    handleSuccess(res, updatedChallenge);
  } catch (error) {
    handleError(res, error);
  }
};

// Suppression d'un défi
export const deleteChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Challenge.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Défi non trouvé.' });
    }
    res.status(204).json();
  } catch (error) {
    handleError(res, error);
  }
};
