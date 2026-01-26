import express from "express";
import { participationController } from "../controllers/participation.controller.js";

const router = express.Router();

router.get("/challenge/:challengeId", participationController.findByChallenge); // Participations d'un challenge
router.get("/user/:userId", participationController.findByUser); // Participations d'un user

router.get("/", participationController.findAll);
router.post("/", participationController.create);
router.get("/:id", participationController.findOne);
router.patch("/:id", participationController.update);
router.delete("/:id", participationController.delete);

router.get("/:id/details", participationController.findOneWithDetails); // details d'une participation + votes + challenge + jeu

export default router;
