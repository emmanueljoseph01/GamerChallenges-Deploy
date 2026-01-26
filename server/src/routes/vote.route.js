import express from "express";
import { voteController } from "../controllers/vote.controller.js";

const router = express.Router();

router.get("/user/:userId", voteController.findByUser); // Tous les votes d'un user
router.get(
  "/participation/:participationId",
  voteController.findByParticipation
); // Tous les votes sur une participation

router.get("/", voteController.findAll);
router.post("/", voteController.create);
router.get("/:id", voteController.findOne);
router.patch("/:id", voteController.update);
router.delete("/:id", voteController.delete);

export default router;
