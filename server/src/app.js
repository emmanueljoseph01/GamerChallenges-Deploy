import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Parsing = req.body (JSON)
app.use(express.json());

// Middleware

// Routes

// errorHandler
app.use(errorHandler);

export default app;
