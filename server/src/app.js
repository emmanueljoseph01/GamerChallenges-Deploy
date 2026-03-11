import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./routes/index.route.js";

const app = express();

// Sécurité
app.use(
  cors({
    origin: ["http://localhost:8080", process.env.CLIENT_URL],
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requêtes par IP
  message: { message: "Trop de requêtes, réessayez plus tard" },
});
app.use(limiter);

app.use(helmet());

// Parsing = req.body (JSON)
app.use(express.json());

// Middleware
app.use(xss());

// Routes
app.use("/api", router);

// Gestion d'erreur
app.use(errorHandler);

export default app;
