import { Participation } from '../models/participation.model.js';

export const createParticipation = async (req, res) => {
  try {
    const participation = await Participation.create(req.body);
    res.status(201).json(participation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllParticipations = async (req, res) => {
  try {
    const participations = await Participation.findAll();
    res.status(200).json(participations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ajoute les autres méthodes (getParticipationById, updateParticipation, deleteParticipation)
