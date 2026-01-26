import { StatusCodes } from "http-status-codes";
import { Challenge, Game, User } from "../models/index.model.js";
import { baseController } from "./base.controller.js";

const userWithoutPassword = {
  model: User,
  attributes: { exclude: ["password"] },
};

export const gameController = {
  ...baseController(Game),

  findAll: async (req, res, next) => {
    try {
      const games = await Game.findAll({
        order: [["title", "ASC"]],
      });
      return res.status(StatusCodes.OK).json(games);
    } catch (error) {
      next(error);
    }
  },

  findOneWithChallenges: async (req, res, next) => {
    try {
      const game = await Game.findByPk(req.params.id, {
        include: [
          {
            model: Challenge,
            include: [{ ...userWithoutPassword }],
          },
        ],
      });

      if (!game) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Jeu introuvable",
        });
      }

      return res.status(StatusCodes.OK).json(game);
    } catch (error) {
      next(error);
    }
  },
};
