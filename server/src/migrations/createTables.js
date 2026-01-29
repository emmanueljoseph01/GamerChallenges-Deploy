import { sequelizeClient } from "../models/index.model.js";

async function initDB() {
  try {
    console.log("Drop tables..");
    await sequelizeClient.drop();

    console.log("Sync tables..");
    await sequelizeClient.sync();

    const tableNames = await sequelizeClient
      .getQueryInterface()
      .showAllTables();
    console.log("All Tables :", tableNames);
    console.log("Migration Ok !");
  } catch (error) {
    console.error("Error during the Sync :", error);
  } finally {
    console.log("Close the connexion");
    await sequelizeClient.close();
  }
}

initDB();
