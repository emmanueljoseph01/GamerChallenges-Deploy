import cors from "cors";
import express from "express";
import { xss } from "express-xss-sanitizer";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./routes/index.route.js";

const app = express();

// Sécurité
app.use(cors());

// Parsing = req.body (JSON)
app.use(express.json());

// Middleware
app.use(xss());

// Routes
app.use("/api", router);

// Gestion d'erreur
app.use(errorHandler);

export default app;
