import { StatusCodes } from "http-status-codes";
import { Role, User } from "../models/index.model.js";
import { baseController } from "./base.controller.js";

const userWithoutPassword = {
  model: User,
  attributes: { exclude: ["password"] },
};

export const roleController = {
  ...baseController(Role),

  findAll: async (req, res, next) => {
    try {
      const roles = await Role.findAll({
        order: [["name", "ASC"]],
      });
      return res.status(StatusCodes.OK).json(roles);
    } catch (error) {
      next(error);
    }
  },

  findOneWithUsers: async (req, res, next) => {
    try {
      const role = await Role.findByPk(req.params.id, {
        include: [{ ...userWithoutPassword }],
      });

      if (!role) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Rôle introuvable",
        });
      }

      return res.status(StatusCodes.OK).json(role);
    } catch (error) {
      next(error);
    }
  },
};
