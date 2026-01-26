import express from "express";
import { challengeController } from "../controllers/challenge.controller.js";

const router = express.Router();

router.get("/user/:userId", challengeController.findByUser); // GET /api/challenges/user/?

router.get("/", challengeController.findAll);
router.get("/:id", challengeController.findOne);
router.post("/", challengeController.create);
router.patch("/:id", challengeController.update);
router.delete("/:id", challengeController.delete);

router.get("/:id/details", challengeController.findOneWithDetails); // GET /api/challenges/3/details = challenge n°(challenge_id) + créateur + jeu + participations

export default router;
