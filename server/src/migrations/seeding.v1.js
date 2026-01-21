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
    // Optionnel : si tu veux être sûr que la connexion est OK avant de commencer
    await sequelizeClient.authenticate();

    console.log("Ajout des roles...");
    const adminRole = await Role.create({ name: "admin" });
    const userRole = await Role.create({ name: "user" });

    console.log("Ajout des jeux...");
    const leagueGame = await Game.create({
      title: "League of Legends",
      image: "https://example.com/lol.jpg",
    });
    const valorantGame = await Game.create({
      title: "Valorant",
      image: "https://example.com/valorant.jpg",
    });

    console.log("Ajout des utilisateurs...");
    const passwordHash = await argon2.hash("monSuperMotDePasse123");

    const adminUser = await User.create({
      username: "AdminMaster",
      email: "admin@esport.com",
      password: passwordHash,
      birthdate: "1995-05-20",
      role_id: adminRole.id,
    });

    const playerUser = await User.create({
      username: "PlayerOne",
      email: "player@esport.com",
      password: passwordHash,
      birthdate: "2001-12-10",
      role_id: userRole.id,
    });

    console.log("Ajout des challenges...");
    const pentakillChallenge = await Challenge.create({
      title: "Meilleur Pentakill",
      description: "Montrez vos meilleurs actions en 1v5",
      rules: "Pas de smurf, ranked uniquement",
      game_id: leagueGame.id,
      user_id: adminUser.id,
    });

    const aceChallenge = await Challenge.create({
      title: "Ace Pistol Round",
      description: "Le plus beau round au pistolet",
      rules: "Enregistrement complet du round requis",
      game_id: valorantGame.id,
      user_id: adminUser.id,
    });

    console.log("Ajout des participations...");
    const participation1 = await Participation.create({
      video_url: "https://youtube.com/watch?v=exemple",
      description: "Mon pentakill avec Jinx en late game",
      user_id: playerUser.id,
      challenge_id: pentakillChallenge.id,
    });

    console.log("Ajout des votes...");
    await Vote.create({
      user_id: adminUser.id,
      participation_id: participation1.id,
    });

    console.log("Seeding termine avec succes !");
  } catch (error) {
    console.error("Error during the seeding:", error);
  } finally {
    console.log("Close the connexion...");
    await sequelizeClient.close();
  }
}
