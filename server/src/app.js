import express from "express";

import routes from "./routes/base.route.js";

const app = express();

// Parsing = req.body (JSON)
app.use(express.json());

// Middleware

// Routes
app.use("/api", routes);
// errorHandler 


export default app;
