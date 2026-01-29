import Joi from "joi";

export const gameSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  image: Joi.string().uri().required(),
  pegi: Joi.number().integer().valid(3, 7, 12).required().messages({
    "any.only": "Le PEGI doit être 3, 7 ou 12",
  }),
});

export const gameUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(255),
  image: Joi.string().uri(),
  pegi: Joi.number().integer().valid(3, 7, 12),
}).min(1);
