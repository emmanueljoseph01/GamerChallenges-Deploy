import express from "express";
import { roleController } from "../controllers/role.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, checkRole(["admin"]), roleController.findAll);
router.get(
  "/:id",
  isAuthenticated,
  checkRole(["admin"]),
  roleController.findOne
);
router.get(
  "/:id/users",
  isAuthenticated,
  checkRole(["admin"]),
  roleController.findOneWithUsers
);

export default router;
