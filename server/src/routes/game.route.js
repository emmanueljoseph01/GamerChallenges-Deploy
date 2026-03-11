import express from "express";
import { gameController } from "../controllers/game.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  gameSchema,
  gameUpdateSchema,
} from "../validations/game.validation.js";

const router = express.Router();

router.get("/", gameController.findAll);
router.post("/", isAuthenticated, validate(gameSchema), gameController.create);
router.get("/:id", gameController.findOne);
router.patch(
  "/:id",
  isAuthenticated,
  validate(gameUpdateSchema),
  gameController.update
);
router.delete(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  gameController.delete
);

router.get("/:id/challenges", gameController.findOneWithChallenges); // liste des challenges dans le game_id

export default router;
