import { Game } from '../models/game.model.js';

export const createGame = async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.status(200).json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ajoute les autres méthodes (getGameById, updateGame, deleteGame)
