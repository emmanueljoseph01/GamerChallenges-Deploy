import express from "express";
import { roleController } from "../controllers/role.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { requireRoles } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, requireRoles(["admin"]), roleController.findAll);
router.get(
  "/:id",
  isAuthenticated,
  requireRoles(["admin"]),
  roleController.findOne
);
router.get(
  "/:id/users",
  isAuthenticated,
  requireRoles(["admin"]),
  roleController.findOneWithUsers
);

export default router;
