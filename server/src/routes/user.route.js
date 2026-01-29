import express from "express";
import { userController } from "../controllers/user.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userSchema,
  userUpdateSchema,
} from "../validations/user.validation.js";

const router = express.Router();

router.get("/leaderboard", userController.getLeaderboard);

router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.post("/", isAuthenticated, validate(userSchema), userController.create);
router.patch(
  "/:id",
  isAuthenticated,
  validate(userUpdateSchema),
  userController.update
);
router.delete("/:id", isAuthenticated, isAdmin, userController.delete);

export default router;
