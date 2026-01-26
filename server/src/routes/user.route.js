import express from "express";
import { userController } from "../controllers/user.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.post("/", isAuthenticated, userController.create);
router.patch("/:id", isAuthenticated, userController.update);
router.delete("/:id", isAuthenticated, isAdmin, userController.delete);

export default router;
