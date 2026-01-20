import { Participation } from '../models/participation.model.js';
<<<<<<< HEAD
import { handleSuccess, handleError } from './base.controller.js'; // On importe les fonctions utilitaires
=======
import { handleError, handleSuccess } from './base.controller.js';
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22

// Création d'une participation
export const createParticipation = async (req, res) => {
  try {
    const participation = await Participation.create(req.body);
<<<<<<< HEAD
    handleSuccess(res, participation, 201); // 201 : Ressource créée
=======
    handleSuccess(res, participation, 201);
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
  } catch (error) {
    handleError(res, error);
  }
};

// Récupération de toutes les participations
export const getAllParticipations = async (req, res) => {
  try {
    const participations = await Participation.findAll();
<<<<<<< HEAD
    handleSuccess(res, participations); // 200 par défaut
=======
    handleSuccess(res, participations);
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
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
<<<<<<< HEAD
      return res.status(404).json({ error: 'Participation non trouvée.' }); // Erreur spécifique si non trouvé
=======
      return res.status(404).json({ error: 'Participation non trouvée.' });
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
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
<<<<<<< HEAD
    const updatedParticipation = await Participation.findByPk(id); // On renvoie la participation mise à jour
=======
    const updatedParticipation = await Participation.findByPk(id);
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
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
<<<<<<< HEAD
    res.status(204).json(); // 204 : Pas de contenu à renvoyer (pas besoin de handleSuccess ici)
=======
    res.status(204).json();
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
  } catch (error) {
    handleError(res, error);
  }
};
<<<<<<< HEAD

=======
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
