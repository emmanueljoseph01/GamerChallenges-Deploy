import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.min": "Le pseudo doit faire au moins 3 caractères",
    "any.required": "Le pseudo est requis",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email invalide",
    "any.required": "L'email est requis",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Le mot de passe doit faire au moins 8 caractères",
    "any.required": "Le mot de passe est requis",
  }),
  birthdate: Joi.date().required().messages({
    "date.base": "Date invalide",
    "any.required": "La date de naissance est requise",
  }),
  profil_image: Joi.string().uri().allow(null, ""),
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  birthdate: Joi.date(),
  profil_image: Joi.string().uri().allow(null, ""),
}).min(1);
