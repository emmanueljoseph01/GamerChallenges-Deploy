import Joi from "joi";

// schéma de validation pour un challenge
export const challengeSchema = Joi.object({
  // titre du challenge
  title: Joi.string()
    .min(3) // 3 caractères minimum
    .max(255) // 255 caractères maximum
    .required()
    .messages({
      "string.base": "Le titre doit être une chaîne de caractères.",
      "string.empty": "Le titre est requis.",
      "string.min": "Le titre doit contenir au moins 3 caractères.",
      "any.required": "Le titre est requis.",
    }),

  // description du challenge
  description: Joi.string()
    .allow(null, "") // Peut être vide ou null
    .messages({
      "string.base": "La description doit être une chaîne de caractères.",
    }),

  // règles du challenge
  rules: Joi.string().min(10).required().messages({
    "string.base": "Ce champs doit contenir une chaîne de caractères.",
    "string.empty": "Veuillez définir les règles du challenge.",
    "string.min": "Ce champs doit contenir au moins 10 caractères.",
    "any.required": "Veuillez entrer les règles du challenge.",
  }),

  //   l'identifiant du jeu associé
  game_id: Joi.number().integer().positive().required().messages({
    "number.base": "L'identifiant du jeu doit être un nombre.",
    "number.integer": "L'identifiant du jeu doit être un entier.",
    "any.required": "L'identifiant du jeu est obligatoire.",
  }),
});

export const challengeUpdateSchema = Joi.object({
  // Les modifications ne sont pas obligatoires mais optionnelles

  title: Joi.string().min(3).max(255),
  description: Joi.string().allow(null, ""),
  rules: Joi.string().min(10),
  game_id: Joi.number().integer().positive(),
  user_id: Joi.number().integer().positive(),
}).min(1); // Au moins 1 champ doit etre modifier
