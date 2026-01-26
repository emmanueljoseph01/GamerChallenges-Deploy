import { StatusCodes } from "http-status-codes";
import { Role, User } from "../models/index.model.js";

export const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [{ model: Role }]
      });

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Utilisateur non authentifié"
        });
      }

      if (!allowedRoles.includes(user.Role.name)) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: "Accès refusé : permissions insuffisantes"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};