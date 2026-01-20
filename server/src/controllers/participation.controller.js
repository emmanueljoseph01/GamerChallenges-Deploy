import { Participation } from '../models/participation.model.js';
import { handleSuccess, handleError } from './base.controller.js'; // On importe les fonctions utilitaires

// Création d'une participation
export const createParticipation = async (req, res) => {
  try {
    const participation = await Participation.create(req.body);
    handleSuccess(res, participation, 201); // 201 : Ressource créée
  } catch (error) {
    handleError(res, error);
  }
};

// Récupération de toutes les participations
export const getAllParticipations = async (req, res) => {
  try {
    const participations = await Participation.findAll();
    handleSuccess(res, participations); // 200 par défaut
  } catch (error) {
    handleError(res, error);
  }
};

// Récupération d'une participation par ID
export const getParticipationById = async (req, res) => {
  try {
    const { id } = req.params;
    const participation = await Participation.findByPk(id);
    if (!participation) {
      return res.status(404).json({ error: 'Participation non trouvée.' }); // Erreur spécifique si non trouvé
    }
    handleSuccess(res, participation);
  } catch (error) {
    handleError(res, error);
  }
};

// Mise à jour d'une participation
export const updateParticipation = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Participation.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'Participation non trouvée.' });
    }
    const updatedParticipation = await Participation.findByPk(id); // On renvoie la participation mise à jour
    handleSuccess(res, updatedParticipation);
  } catch (error) {
    handleError(res, error);
  }
};

// Suppression d'une participation
export const deleteParticipation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Participation.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Participation non trouvée.' });
    }
    res.status(204).json(); // 204 : Pas de contenu à renvoyer (pas besoin de handleSuccess ici)
  } catch (error) {
    handleError(res, error);
  }
};

