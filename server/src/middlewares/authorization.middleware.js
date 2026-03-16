import { StatusCodes } from "http-status-codes";
import { Role, User } from "../models/index.model.js";

const fetchUserWithRole = async (userId) => {
  if (!userId) return null;
  return await User.findByPk(userId, { include: [{ model: Role }] });
};

export const requireRoles = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await fetchUserWithRole(req.user?.id);

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Utilisateur non authentifié",
        });
      }

      const roleName = user?.Role?.name;
      if (!roleName || !allowedRoles.includes(roleName)) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: "Accès refusé : permissions insuffisantes",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const requireOwnerOrAdmin =
  (Model, { ownerField = "user_id", paramIdField = "id" } = {}) =>
  async (req, res, next) => {
    try {
      const resource = await Model.findByPk(req.params?.[paramIdField]);

      if (!resource) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Ressource introuvable" });
      }

      const user = await fetchUserWithRole(req.user?.id);

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Utilisateur non authentifié",
        });
      }

      const isAdmin = user?.Role?.name === "admin";
      const isOwner = resource?.[ownerField] === req.user?.id;

      if (!isOwner && !isAdmin) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "Accès refusé" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

