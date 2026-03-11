import express from "express";
import { voteController } from "../controllers/vote.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { voteSchema } from "../validations/vote.validation.js";

const router = express.Router();

router.get("/user/:userId", voteController.findByUser); // Tous les votes d'un user
router.get(
  "/participation/:participationId",
  voteController.findByParticipation
); // Tous les votes sur une participation

router.get("/", voteController.findAll);
router.post(
  "/toggle",
  isAuthenticated,
  validate(voteSchema),
  voteController.toggle
);
router.get("/:id", voteController.findOne);
router.delete(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  voteController.delete
);

export default router;
