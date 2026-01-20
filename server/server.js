import "dotenv/config";
import app from "./src/app.js";
import sequelizeClient from './src/configs/sequelize.client.js';
import './src/models/index.model.js'; // Importe les modèles pour qu'ils soient enregistrés

const PORT = process.env.PORT || 3000;

// Synchronisation des modèles avec la base de données
sequelizeClient.sync({ alter: true })
  .then(() => {
    console.log('Tables synchronisées avec succès !');
    
    // Démarrage du serveur après la synchronisation
    app.listen(PORT, () => {
      console.log(`Application démarrée sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de synchronisation :', err);
    process.exit(1);
  });
