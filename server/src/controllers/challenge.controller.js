import { Challenge } from '../models/challenge.model.js';
<<<<<<< HEAD
import { handleSuccess, handleError } from './base.controller.js';
=======
import { handleError, handleSuccess } from './base.controller.js';
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22

// Création d'un défi
export const createChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.create(req.body);
<<<<<<< HEAD
    handleSuccess(res, challenge, 201); // 201 : Ressource créée
=======
    handleSuccess(res, challenge, 201);
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
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
<<<<<<< HEAD
    res.status(204).json(); // 204 : Pas de contenu à renvoyer
=======
    res.status(204).json();
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
  } catch (error) {
    handleError(res, error);
  }
};
