import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import gameRoutes from './routes/game.route.js';    
import participationRoutes from './routes/participation.route.js';
import voteRoutes from './routes/vote.route.js';
import { logger } from './middlewares/logger.middleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(logger);
app.use(express.json());

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Bienvenue sur GamerChallenges !');
});

// Utilisation des routes
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/participations', participationRoutes);
app.use('/votes', voteRoutes);

export default app;
