import { StatusCodes } from "http-status-codes";
import { Challenge, Game, Participation, User } from "../models/index.model.js";
import { baseController } from "./base.controller.js";

const userWithoutPassword = {
  model: User,
  attributes: { exclude: ["password"] },
};

export const challengeController = {
  ...baseController(Challenge),

  findAll: async (req, res, next) => {
    try {
      const challenges = await Challenge.findAll({
        include: [{ ...userWithoutPassword }, { model: Game }],
        order: [["created_at", "DESC"]],
      });
      return res.status(StatusCodes.OK).json(challenges);
    } catch (error) {
      next(error);
    }
  },

  findOneWithDetails: async (req, res, next) => {
    try {
      const challenge = await Challenge.findByPk(req.params.id, {
        include: [
          { ...userWithoutPassword },
          { model: Game },
          {
            model: Participation,
            include: [{ ...userWithoutPassword }],
          },
        ],
      });

      if (!challenge) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Challenge introuvable",
        });
      }

      return res.status(StatusCodes.OK).json(challenge);
    } catch (error) {
      next(error);
    }
  },

  findByUser: async (req, res, next) => {
    try {
      const challenges = await Challenge.findAll({
        where: { user_id: req.params.userId },
        include: [{ ...userWithoutPassword }, { model: Game }],
        order: [["created_at", "DESC"]],
      });

      return res.status(StatusCodes.OK).json(challenges);
    } catch (error) {
      next(error);
    }
  },
};
