import express from "express";
import challengeRoutes from "./challenge.route.js"; 


const router = express.Router();
router.use("/challenges", challengeRoutes);


export default router;

