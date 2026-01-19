import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import gameRoutes from './routes/game.route.js';
import participationRoutes from './routes/participation.route.js';
import baseRoutes from './routes/base.route.js';

const app = express();
app.use(cors());
app.use(express.json());

// Utilisation des routes de base
app.use('/', baseRoutes);

// Utilisation des routes spécifiques
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/participations', participationRoutes);

export default app;
