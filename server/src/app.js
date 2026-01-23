import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import challengeRoutes from "./routes/challenge.route.js";
import gameRoutes from "./routes/game.route.js";
import participationRoutes from "./routes/participation.route.js";
import roleRoutes from "./routes/role.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

// Parsing = req.body (JSON)
app.use(express.json());

// Middleware

// Routes
app.use("/api/challenges", challengeRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/participation", participationRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
//errorHandler

app.use(errorHandler);

export default app;
