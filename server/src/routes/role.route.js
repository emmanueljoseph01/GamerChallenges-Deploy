import express from "express";
import { roleController } from "../controllers/role.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, roleController.findAll); // GET roles = voir tout les roles
router.get("/:id", isAuthenticated, isAdmin, roleController.findOne); // GET roles/role_id
router.get(
  "/:id/users",
  isAuthenticated,
  isAdmin,
  roleController.findOneWithUsers
); // GET /roles/role_id/users  = listes des users selon le id du role

export default router;
