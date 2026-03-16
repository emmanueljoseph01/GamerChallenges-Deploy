import { StatusCodes } from "http-status-codes";
import { userService } from "../services/user.service.js";

export const userController = {
  create: async (req, res, next) => {
    try {
      const user = await userService.create(req.body);
      return res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const users = await userService.findAll();
      return res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const user = await userService.findOne(req.params.id);

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Utilisateur introuvable",
        });
      }

      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const updated = await userService.update(req.params.id, req.body);
      if (!updated) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Utilisateur introuvable",
        });
      }
      return res.status(StatusCodes.OK).json(updated);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const deletedCount = await userService.delete(req.params.id);

      if (!deletedCount) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Impossible de supprimer : ressource introuvable",
        });
      }

      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  },

  getLeaderboard: async (req, res, next) => {
    try {
      const rankedUsers = await userService.getLeaderboard({ limit: 25 });
      return res.status(StatusCodes.OK).json(rankedUsers);
    } catch (error) {
      next(error);
    }
  },
};
