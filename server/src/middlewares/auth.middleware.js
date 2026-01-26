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

    if (req.user.role_id !== 1) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Accès réservé aux administrateurs",
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: "Accès refusé",
    });
  }
};
