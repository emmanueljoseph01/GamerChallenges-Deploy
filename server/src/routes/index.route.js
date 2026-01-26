import express from "express";
import challengeRoutes from "./challenge.route.js";
import gameRoutes from "./game.route.js";
import participationRoutes from "./participation.route.js";
import roleRoutes from "./role.route.js";
import userRoutes from "./user.route.js";
import voteRoutes from "./vote.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/games", gameRoutes);
router.use("/challenges", challengeRoutes);
router.use("/participations", participationRoutes);
router.use("/roles", roleRoutes);
router.use("/users", userRoutes);
router.use("/votes", voteRoutes);

export default router;
