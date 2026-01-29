import Joi from "joi";

export const voteSchema = Joi.object({
  // garde uniquement la participation ciblé
  participation_id: Joi.number().integer().positive().required().messages({
    "number.base": "L'ID de participation doit être un nombre",
    "any.required": "L'ID de participation est requis pour voter.",
  }),
});
