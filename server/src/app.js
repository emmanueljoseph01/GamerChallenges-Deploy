import express from "express";
import routes from "./routes/base.route.js";
import challengeRoutes from "./routes/challenge.route.js";
//import gameRoute from './routes/gameRoute';
//import participationRoute from './routes/participationRoute';
//import roleRoute from './routes/roleRoute';
//import userRoute from './routes/userRoute';



const app = express();
// Parsing = req.body (JSON)
app.use(express.json());

// Middleware

// Routes
app.use("/api", routes);
app.use("/api/challenges", challengeRoutes);

//app.use('/games', gameRoute);
//app.use('/participation', participationRoute);
//app.use('/roles', roleRoute);
//app.use('/users', userRoute);



// errorHandler


export default app;