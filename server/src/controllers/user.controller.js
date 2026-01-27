import argon2 from "argon2";
import { StatusCodes } from "http-status-codes";
import { Participation, Role, User, Vote } from "../models/index.model.js";
import { baseController } from "./base.controller.js";

export const userController = {
  ...baseController(User),

  create: async (req, res, next) => {
    try {
      // On hash le mdp a la creation, puis on envoie le body avec le password hash avec Argon2
      const hashedPassword = await argon2.hash(req.body.password);

      const user = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      const userWithoutPassword = await User.findByPk(user.id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Role }],
      });
      return res.status(StatusCodes.CREATED).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
        include: [
          { model: Role },
          {
            model: Participation,
            include: [{ model: Vote }],
          },
        ],
      });
      return res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Role }],
      });

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
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Utilisateur introuvable",
        });
      }

      const { role_id, password, ...allowedUpdates } = req.body; // Empeche le changement de role

      if (password) {
        allowedUpdates.password = await argon2.hash(password);
      }

      await user.update(allowedUpdates);

      const userWithoutPassword = await User.findByPk(user.id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Role }],
      });
      return res.status(StatusCodes.OK).json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  },
};
