import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./routes/index.route.js";

const app = express();

// Parsing = req.body (JSON)
app.use(express.json());

// Middleware

// Routes
app.use("/api", router);
// errorHandler
app.use(errorHandler);

export default app;
