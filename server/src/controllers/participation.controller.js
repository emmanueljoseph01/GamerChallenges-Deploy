import { Participation } from '../models/participation.model.js';
import { handleError, handleSuccess } from './base.controller.js';

// Création d'une participation
export const createParticipation = async (req, res) => {
  try {
    const participation = await Participation.create(req.body);
    handleSuccess(res, participation, 201);
  } catch (error) {
    handleError(res, error);
  }
};

// Récupération de toutes les participations
export const getAllParticipations = async (req, res) => {
  try {
    const participations = await Participation.findAll();
    handleSuccess(res, participations);
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
      return res.status(404).json({ error: 'Participation non trouvée.' });
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
    const updatedParticipation = await Participation.findByPk(id);
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
    res.status(204).json();
  } catch (error) {
    handleError(res, error);
  }
};
