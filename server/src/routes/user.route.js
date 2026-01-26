import express from "express";
import { userController } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.post("/", userController.create);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
