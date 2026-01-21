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
  try {
    await sequelizeClient.authenticate();

    console.log("Hachage des mots de passe...");
    const adminPassword = await argon2.hash("adminSecureKey!2024");
    const userPassword = await argon2.hash("playerGameZone!2024");

    console.log("Creation des Roles...");
    const adminRole = await Role.create({ name: "admin" });
    const userRole = await Role.create({ name: "user" });

    console.log("Creation des Jeux (bulkCreate)...");
    const gamesList = [
      {
        title: "Minecraft",
        image: "https://example.com/minecraft.jpg",
        pegi: 7,
      },
      {
        title: "Valorant",
        image: "https://example.com/valorant.jpg",
        pegi: 16,
      },
      {
        title: "League of Legends",
        image: "https://example.com/lol.jpg",
        pegi: 12,
      },
      { title: "FIFA 24", image: "https://example.com/fifa.jpg", pegi: 3 },
      {
        title: "Fortnite",
        image: "https://example.com/fortnite.jpg",
        pegi: 12,
      },
      { title: "Rocket League", image: "https://example.com/rl.jpg", pegi: 3 },
      { title: "Elden Ring", image: "https://example.com/elden.jpg", pegi: 16 },
      {
        title: "Call of Duty: Modern Warfare",
        image: "https://example.com/cod.jpg",
        pegi: 18,
      },
      {
        title: "Call of Duty: Black Ops 7",
        image: "https://example.com/cod-bo7.jpg",
        pegi: 18,
      },
    ];

    const gamesDB = await Game.bulkCreate(gamesList);

    // Recuperation des jeux pour les challenges
    const lolGame = gamesDB.find((g) => g.title === "League of Legends");
    const valoGame = gamesDB.find((g) => g.title === "Valorant");

    console.log("Creation des Admins...");
    await User.create({
      username: "System_Admin",
      email: "root@esport.com",
      password: adminPassword,
      birthdate: "1990-01-01",
      profil_image: "https://api.dicebear.com/7.x/initials/svg?seed=SA",
      role_id: adminRole.id,
    });

    const moderatorUser = await User.create({
      username: "BanHammer",
      email: "moderator@esport.com",
      password: adminPassword,
      birthdate: "1995-05-20",
      profil_image: "https://api.dicebear.com/7.x/initials/svg?seed=BH",
      role_id: adminRole.id,
    });

    console.log("Creation des 10 Utilisateurs...");

    const gamerTags = [
      "MidKing",
      "SevenZ",
      "ByWoo",
      "TheFrenchTitan",
      "General_K",
      "C0mplex",
      "Reckless_ADC",
      "Cloudy_FPS",
      "OneTap_Machine",
      "Rage_Quit_Boy",
    ];

    const usersList = gamerTags.map((tag, index) => {
      const birthYear = index < 5 ? 1998 : 2005;
      return {
        username: tag,
        email: `${tag.toLowerCase().replace(/_/g, "")}@pro-gaming.com`,
        password: userPassword,
        birthdate: `${birthYear}-06-15`,
        profil_image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${tag}`,
        role_id: userRole.id,
      };
    });

    const usersDB = await User.bulkCreate(usersList);

    console.log("Creation des Challenges...");
    const pentakillChallenge = await Challenge.create({
      title: "Pentakill de Legende",
      description: "Montrez vos meilleures actions en 1v5 dans la faille !",
      rules: "Pas de smurf, ranked uniquement, replay obligatoire.",
      game_id: lolGame.id,
      user_id: moderatorUser.id,
    });

    const aceChallenge = await Challenge.create({
      title: "Ace Pistol Round",
      description: "Le plus beau round au pistolet sur Haven ou Bind.",
      rules: "Enregistrement complet du round requis, pas de cuts.",
      game_id: valoGame.id,
      user_id: moderatorUser.id,
    });

    console.log("Ajout de participations et votes...");

    // MidKing (index 0) participe au challenge LoL
    const participation1 = await Participation.create({
      title: "Outplay Zed vs Talon",
      video_url: "https://youtube.com/watch?v=midking_play",
      description: "Outplay Zed vs Talon, mecanique pure.",
      user_id: usersDB[0].id,
      challenge_id: pentakillChallenge.id,
    });

    // SevenZ (index 1) participe au challenge Valorant
    await Participation.create({
      title: "Icebox Jett Knives",
      video_url: "https://youtube.com/watch?v=sevenz_jett",
      description: "Ace Jett knives only sur Icebox.",
      user_id: usersDB[1].id,
      challenge_id: aceChallenge.id,
    });

    // TheFrenchTitan (index 3) participe aussi
    await Participation.create({
      title: "1v4 Spawn Clutch",
      video_url: "https://youtube.com/watch?v=titan_clutch",
      description: "Clutch 1v4 incroyable au spawn.",
      user_id: usersDB[3].id,
      challenge_id: aceChallenge.id,
    });

    // Le moderateur vote pour MidKing
    await Vote.create({
      user_id: moderatorUser.id,
      participation_id: participation1.id,
    });

    console.log("Seeding termine avec succes !");
  } catch (error) {
    console.error("Erreur durant le seeding :", error);
  } finally {
    console.log("Fermeture de la connexion...");
    await sequelizeClient.close();
  }
}

seedDB();
