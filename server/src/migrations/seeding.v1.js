import {
  sequelizeClient,
  Role,
  User,
  Game,
  Challenge,
  Participation,
  Vote,
} from "../models/index.model.js";

import argon2 from "argon2";

async function seedDB() {
  const passwordHash = await argon2.hash("azerty123");
  try {
  } catch (error) {
    console.error("Error during the seeding:", error);
  } finally {
    console.log("Close the connexion...");
    await sequelizeClient.close();
  }
}
