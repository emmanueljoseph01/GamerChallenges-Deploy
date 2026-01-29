import Joi from "joi";

// CREATE
export const participationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  video_url: Joi.string().uri().required(),
  description: Joi.string().allow(null, ""),
  challenge_id: Joi.number().integer().positive().required(),
});

// UPDATE
export const participationUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  video_url: Joi.string().uri(),
  description: Joi.string().allow(null, ""),
  // évite de changer le user_id ou challenge_id d'une participation existante,
  user_id: Joi.number().integer().positive(),
  challenge_id: Joi.number().integer().positive(),
}).min(1);
