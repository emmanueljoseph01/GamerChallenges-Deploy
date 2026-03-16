import express from "express";
import { participationController } from "../controllers/participation.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  requireOwnerOrAdmin,
  requireRoles,
} from "../middlewares/authorization.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { Participation } from "../models/participation.model.js";
import {
  participationSchema,
  participationUpdateSchema,
} from "../validations/participation.validation.js";

const router = express.Router();

router.get("/challenge/:challengeId", participationController.findByChallenge); // Participations d'un challenge
router.get("/user/:userId", participationController.findByUser); // Participations d'un user

router.get("/", participationController.findAll);
router.post(
  "/",
  isAuthenticated,
  validate(participationSchema),
  participationController.create
);
router.get("/:id", participationController.findOne);
router.patch(
  "/:id",
  isAuthenticated,
  requireOwnerOrAdmin(Participation),
  validate(participationUpdateSchema),
  participationController.update
);
router.delete(
  "/:id",
  isAuthenticated,
  requireRoles(["admin"]),
  participationController.delete
);

router.get("/:id/details", participationController.findOneWithDetails); // details d'une participation + votes + challenge + jeu

export default router;
