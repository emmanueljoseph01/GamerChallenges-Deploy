import "dotenv/config";
import app from "./src/app.js";
import { sequelizeClient } from "./src/configs/sequelize.client.js";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelizeClient.authenticate();
    console.log("Connexion BDD réussie.");

    app.listen(PORT, () => {
      console.log(`Serveur sur le port: ${PORT}`);
    });
  } catch (error) {
    console.error("Impossible de démarrer le serveur:", error);
  }
}

start();
