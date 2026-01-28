import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Le nom d'utilisateur doit faire au moins 3 caractères",
    "string.max": "Le nom d'utilisateur ne peut pas dépasser 30 caractères",
    "any.required": "Le nom d'utilisateur est requis",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "L'email n'est pas valide",
    "any.required": "L'email est requis",
  }),

  password: Joi.string().min(8).required().messages({
    "string.min": "Le mot de passe doit faire au moins 8 caractères",
    "any.required": "Le mot de passe est requis",
  }),

  birthdate: Joi.date().required().messages({
    "date.base": "La date de naissance n'est pas valide",
    "any.required": "La date de naissance est requise",
  }),

  consent: Joi.any().strip(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "L'email n'est pas valide",
    "any.required": "L'email est requis",
  }),

  password: Joi.string().required().messages({
    "any.required": "Le mot de passe est requis",
  }),
});
