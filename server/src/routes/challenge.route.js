import express from "express";
import { challengeController } from "../controllers/challenge.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  challengeSchema,
  challengeUpdateSchema,
} from "../validations/challenge.validation.js";

const router = express.Router();

router.get("/user/:userId", challengeController.findByUser); // GET /api/challenges/user/?

router.get("/", challengeController.findAll);
router.get("/:id", challengeController.findOne);
router.post(
  "/",
  isAuthenticated,
  validate(challengeSchema),
  challengeController.create
);
router.patch(
  "/:id",
  isAuthenticated,
  validate(challengeUpdateSchema),
  challengeController.update
);
router.delete("/:id", isAuthenticated, isAdmin, challengeController.delete);

router.get("/:id/details", challengeController.findOneWithDetails); // GET /api/challenges/3/details = challenge n°(challenge_id) + créateur + jeu + participations

export default router;
