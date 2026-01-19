import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
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

// Autres routes...
export default app;

