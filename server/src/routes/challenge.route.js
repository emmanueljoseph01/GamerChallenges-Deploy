import express from "express";
import { challengeController } from "../controllers/challenge.controller.js";
import {
  isAuthenticated,
  isOwnerOrAdmin,
} from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { Challenge } from "../models/challenge.model.js";
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
  isOwnerOrAdmin(Challenge),
  validate(challengeUpdateSchema),
  challengeController.update
);
router.delete(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  challengeController.delete
);

router.get("/:id/details", challengeController.findOneWithDetails); // GET /api/challenges/3/details = challenge n°(challenge_id) + créateur + jeu + participations

export default router;
