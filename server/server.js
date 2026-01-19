import sequelizeClient from './src/configs/sequelize.client.js';
import './src/models/index.model.js'; // Importe les modèles pour qu'ils soient enregistrés

// Synchronisation des modèles avec la base de données
sequelizeClient.sync({ alter: true })
  .then(() => console.log('Tables synchronisées avec succès !'))
  .catch(err => console.error('Erreur de synchronisation :', err));
