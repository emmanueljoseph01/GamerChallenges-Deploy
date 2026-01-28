import { StatusCodes } from "http-status-codes";
import { Challenge, Participation, User, Vote } from "../models/index.model.js";
import { baseController } from "./base.controller.js";

const userWithoutPassword = {
  model: User,
  attributes: { exclude: ["password"] },
};

export const voteController = {
  ...baseController(Vote),

  toggle: async (req, res, next) => {
    try {
      const user_id = req.user.id; // Vient du token
      const { participation_id } = req.body;

      // 1. On cherche si le vote existe déjà
      const existingVote = await Vote.findOne({
        where: { user_id, participation_id },
      });

      if (existingVote) {
        // 2. Si oui, on le supprime (UNVOTE)
        await existingVote.destroy();
        return res
          .status(StatusCodes.OK)
          .json({ message: "Vote retiré", voted: false });
      } else {
        // 3. Si non, on le crée (VOTE)
        await Vote.create({ user_id, participation_id });
        return res
          .status(StatusCodes.CREATED)
          .json({ message: "A voté !", voted: true });
      }
    } catch (error) {
      next(error);
    }
  },

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
