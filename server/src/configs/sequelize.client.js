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

export default sequelizeClient;

// async function dbConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("Sequelize succeed");
//   } catch (error) {
//     console.log("Sequelize failed", error);
//   }
// }

// dbConnection();
