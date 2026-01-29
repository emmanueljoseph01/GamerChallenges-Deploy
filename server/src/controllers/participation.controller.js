import { StatusCodes } from "http-status-codes";
import {
  Challenge,
  Game,
  Participation,
  User,
  Vote,
} from "../models/index.model.js";
import { baseController } from "./base.controller.js";

const userWithoutPassword = {
  model: User,
  attributes: { exclude: ["password"] },
};

export const participationController = {
  ...baseController(Participation),

  create: async (req, res, next) => {
    try {
      const userIdFromToken = req.user.id; // Identifiant de la personne qui fait la requete

      const data = {
        ...req.body,
        user_id: userIdFromToken,
      };

      const participation = await Participation.create(data);

      return res.status(StatusCodes.CREATED).json(participation);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const participations = await Participation.findAll({
        include: [
          { ...userWithoutPassword },
          {
            model: Challenge,
            include: [{ model: Game }],
          },
        ],
        order: [["created_at", "DESC"]],
      });
      return res.status(StatusCodes.OK).json(participations);
    } catch (error) {
      next(error);
    }
  },

  findOneWithDetails: async (req, res, next) => {
    try {
      const participation = await Participation.findByPk(req.params.id, {
        include: [
          { ...userWithoutPassword },
          {
            model: Challenge,
            include: [{ model: Game }, { ...userWithoutPassword }],
          },
          {
            model: Vote,
            include: [{ ...userWithoutPassword }],
          },
        ],
      });

      if (!participation) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Participation introuvable",
        });
      }

      return res.status(StatusCodes.OK).json(participation);
    } catch (error) {
      next(error);
    }
  },

  findByChallenge: async (req, res, next) => {
    try {
      const participations = await Participation.findAll({
        where: { challenge_id: req.params.challengeId },
        include: [
          { ...userWithoutPassword },
          {
            model: Vote,
            include: [{ ...userWithoutPassword }],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      return res.status(StatusCodes.OK).json(participations);
    } catch (error) {
      next(error);
    }
  },

  findByUser: async (req, res, next) => {
    try {
      const participations = await Participation.findAll({
        where: { user_id: req.params.userId },
        include: [
          {
            model: Challenge,
            include: [{ model: Game }],
          },
          { model: Vote },
        ],
        order: [["created_at", "DESC"]],
      });

      return res.status(StatusCodes.OK).json(participations);
    } catch (error) {
      next(error);
    }
  },
};
