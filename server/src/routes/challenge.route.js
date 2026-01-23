import express from "express";
import { challengeController }from "../controllers/challenge.controller.js";



const router = express.Router();

router.get("/", challengeController.findAll);
router.get("/:id", challengeController.findOne);
router.post("/", challengeController.create);
router.put("/:id", challengeController.update);
router.delete("/:id", challengeController.delete);





export default router;

