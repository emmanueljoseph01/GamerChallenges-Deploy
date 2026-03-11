import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

// vérifier la connexion de l'utilisateur
export const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Token manquant",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Token invalide ou expiré",
    });
  }
};

// Si le user a le role "admin"
export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Non authentifié",
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: "Accès refusé",
    });
  }
};

export const isOwnerOrAdmin = (Model) => async (req, res, next) => {
  try {
    const resource = await Model.findByPk(req.params.id);

    if (!resource) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Ressource introuvable" });
    }

    const isAdmin = req.user.role_id === 1; // temporaire, à remplacer par checkRole après
    const isOwner = resource.user_id === req.user.id;

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
