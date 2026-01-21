import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelizeClient = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false,
});

// // Test de la connexion à la base de données
// sequelizeClient.authenticate()
//   .then(() => {
//     console.log('Connexion à la base de données établie avec succès.');
//   })
//   .catch(err => {
//     console.error('Impossible de se connecter à la base de données:', err);
//   });

export default sequelizeClient;
