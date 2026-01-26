import { StatusCodes } from "http-status-codes";
import { Challenge, Participation, User, Vote } from "../models/index.model.js";
import { baseController } from "./base.controller.js";

const userWithoutPassword = {
  model: User,
  attributes: { exclude: ["password"] },
};

export const voteController = {
  ...baseController(Vote),

  findAll: async (req, res, next) => {
    try {
      const votes = await Vote.findAll({
        include: [
          { ...userWithoutPassword },
          {
            model: Participation,
            include: [{ ...userWithoutPassword }, { model: Challenge }],
          },
        ],
      });
      return res.status(StatusCodes.OK).json(votes);
    } catch (error) {
      next(error);
    }
  },

  findByUser: async (req, res, next) => {
    try {
      const votes = await Vote.findAll({
        where: { user_id: req.params.userId },
        include: [
          {
            model: Participation,
            include: [{ ...userWithoutPassword }, { model: Challenge }],
          },
        ],
      });

      return res.status(StatusCodes.OK).json(votes);
    } catch (error) {
      next(error);
    }
  },

  findByParticipation: async (req, res, next) => {
    try {
      const votes = await Vote.findAll({
        where: { participation_id: req.params.participationId },
        include: [{ ...userWithoutPassword }],
      });

      return res.status(StatusCodes.OK).json(votes);
    } catch (error) {
      next(error);
    }
  },
};
