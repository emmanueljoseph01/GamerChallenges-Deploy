import express from "express";
import { roleController } from "../controllers/role.controller.js";

const router = express.Router();

router.get("/", roleController.findAll); // GET roles = voir tout les roles
router.get("/:id", roleController.findOne); // GET roles/role_id
router.get("/:id/users", roleController.findOneWithUsers); // GET /roles/role_id/users  = listes des users selon le id du role

export default router;
