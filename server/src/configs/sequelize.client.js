import "dotenv/config"; // Charge les variables d'environnement depuis le fichier .env
import { Sequelize } from "sequelize";

// Configuration de la connexion à la base de données PostgreSQL
const sequelizeClient = new Sequelize({
  database: process.env.DB_NAME,    // Nom de la base de données
  username: process.env.DB_USER,    // Nom d'utilisateur de la base de données
  password: process.env.DB_PASSWORD, // Mot de passe de la base de données
  host: process.env.DB_HOST,        // Hôte de la base de données
  port: process.env.DB_PORT,        // Port de la base de données
  dialect: process.env.DB_DIALECT,  // Dialecte de la base de données (postgres, mysql, etc.)
  logging: false,                   // Désactive les logs SQL pour éviter la verbosité
});

// Test de la connexion à la base de données
sequelizeClient.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

export default sequelizeClient;
