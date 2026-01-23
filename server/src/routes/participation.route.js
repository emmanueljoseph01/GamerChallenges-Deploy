import express from "express";
import { participationController } from "../controllers/game.controller.js";

const router = express.Router();    

router.get("/", participationController.getAllParticipations);
router.get("/:id", participationController.getParticipationById);
router.post("/", participationController.createParticipation);
router.put("/:id", participationController.updateParticipation);
router.delete("/:id", participationController.deleteParticipation);

export default router;
