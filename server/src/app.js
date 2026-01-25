import express from "express";

import routes from "./routes/base.route.js";
import challengeRoutes from "./routes/challenge.route.js";





const app = express();

// Parsing = req.body (JSON)
app.use(express.json());

// Middleware

// Routes
app.use("/api", routes);
app.use("/api/challenges", challengeRoutes);






// errorHandler 


export default app;