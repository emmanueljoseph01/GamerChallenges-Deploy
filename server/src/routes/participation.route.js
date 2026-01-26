import express from "express";
import { participationController } from "../controllers/participation.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/challenge/:challengeId", participationController.findByChallenge); // Participations d'un challenge
router.get("/user/:userId", participationController.findByUser); // Participations d'un user

router.get("/", participationController.findAll);
router.post("/", isAuthenticated, participationController.create);
router.get("/:id", participationController.findOne);
router.patch("/:id", isAuthenticated, participationController.update);
router.delete("/:id", isAuthenticated, isAdmin, participationController.delete);

router.get("/:id/details", participationController.findOneWithDetails); // details d'une participation + votes + challenge + jeu

export default router;
