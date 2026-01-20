import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
<<<<<<< HEAD
import gameRoutes from './routes/game.route.js';
import participationRoutes from './routes/participation.route.js';
import baseRoutes from './routes/base.route.js';
import challengeRoutes from './routes/challenge.route.js';
import { auth } from './middlewares/auth.middleware.js';
import { logger } from './middlewares/logger.middleware.js';

const app = express();

// 1. Middleware de logging (pour toutes les routes)
app.use(logger);

// 2. Middlewares globaux
app.use(cors());
app.use(express.json());

// 3. Utilisation des routes de base
app.use('/', baseRoutes);

// 4. Routes spécifiques avec leurs middlewares
app.use('/users', auth, userRoutes); // auth s'applique seulement à /users
app.use('/games', gameRoutes);
app.use('/participations', participationRoutes);
app.use('/challenges', challengeRoutes); // validateChallenge est dans la route

// 5. Middleware pour les routes non trouvées (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée.' });
});

// 6. Middleware de gestion d'erreurs (TOUJOURS à la fin)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur est survenue sur le serveur.' });
});
=======
import sequelizeClient from './configs/sequelize.client.js';
import './models/index.model.js'; // Pour charger les associations

const app = express();

// Synchronisation de la base de données
sequelizeClient.sync({ alter: true }).then(() => {
  console.log('✅ Base de données synchronisée');
}).catch(error => {
  console.error('❌ Erreur de synchronisation DB:', error);
});

// Middleware
app.use(cors());
app.use(express.json());

// Route de base pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Bienvenue sur GamerChallenges !');
});

// Routes utilisateur
app.use('/users', userRoutes);
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22

// Autres routes...
export default app;

