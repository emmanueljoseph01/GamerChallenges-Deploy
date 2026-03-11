import express from "express";
import { userController } from "../controllers/user.controller.js";
import {
  isAuthenticated,
  isOwnerOrAdmin,
} from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { User } from "../models/user.model.js";
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
  isOwnerOrAdmin(User),
  validate(userUpdateSchema),
  userController.update
);
router.delete(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  userController.delete
);

export default router;
