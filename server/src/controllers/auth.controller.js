import argon2 from "argon2";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Role, User } from "../models/index.model.js";

export const authController = {
  register: async (req, res, next) => {
    try {
      const { username, email, password, birthdate, profil_image } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(StatusCodes.CONFLICT).json({
          message: "Cet email est déjà utilisé",
        });
      }

      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(StatusCodes.CONFLICT).json({
          message: "Ce nom d'utilisateur est déjà pris",
        });
      }

      const hashedPassword = await argon2.hash(password);

      // Creation du user avec le role "user" par defaut (role_id = 2)
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        birthdate,
        profil_image,
        role_id: 2,
      });

      const userWithoutPassword = await User.findByPk(user.id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Role }],
      });

      return res.status(StatusCodes.CREATED).json({
        message: "Compte créé avec succès",
        user: userWithoutPassword,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email et mot de passe requis",
        });
      }

      const user = await User.findOne({
        where: { email },
        include: [{ model: Role }],
      });

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Email ou mot de passe incorrect",
        });
      }

      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: "Email ou mot de passe incorrect",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role_id: user.role_id,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
      );

      // Retourner l'utilisateur sans le password + le token
      const { password: _, ...userWithoutPassword } = user.toJSON();

      return res.status(StatusCodes.OK).json({
        message: "Connexion réussie",
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      return res.status(StatusCodes.OK).json({
        message: "Déconnexion réussie",
      });
    } catch (error) {
      next(error);
    }
  },

  // Recup l'utilisateur connecté
  me: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
        include: [{ model: Role }],
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Utilisateur non trouvé",
        });
      }

      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  },
};
