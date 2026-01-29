/* src/migrations/seedingTables.js */
import {
  Challenge,
  Game,
  Participation,
  Role,
  sequelizeClient,
  User,
  Vote,
} from "../models/index.model.js";

import argon2 from "argon2";

// Petits textes pour le Lorem Ipsum
const LOREM_TITLES = [
  "Incroyable performance",
  "Mon meilleur run",
  "Record battu !",
  "Juste pour le fun",
  "Challenge validé",
  "Speedrun attempt",
  "Pas facile celui-là",
  "Enfin réussi !",
  "Regardez la fin",
  "Epic fail au début",
];

const LOREM_DESC =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

async function seedDB() {
  try {
    await sequelizeClient.authenticate();
    console.log("Seeding...");

    // 1. Mots de passe
    const adminPassword = await argon2.hash("adminSecureKey!2026");
    const userPassword = await argon2.hash("playerGameZone!2026");

    // 2. Roles
    console.log("Création des rôles");
    const adminRole = await Role.create({ name: "admin" });
    const userRole = await Role.create({ name: "user" });

    // 3. Jeux (PEGI 12 MAX)
    console.log("Création des jeux");
    const gamesList = [
      {
        title: "Minecraft",
        image: "https://images.unsplash.com/photo-1627856014759-085292f22652",
        pegi: 7,
      },
      {
        title: "Rocket League",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5",
        pegi: 3,
      },
      {
        title: "League of Legends",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
        pegi: 12,
      },
      {
        title: "FIFA 24",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
        pegi: 3,
      },
      {
        title: "Fortnite",
        image: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa",
        pegi: 12,
      },
      {
        title: "Mario Kart 8",
        image: "https://images.unsplash.com/photo-1599557291404-5471d782167d",
        pegi: 3,
      },
      {
        title: "Overwatch 2",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
        pegi: 12,
      },
      {
        title: "Fall Guys",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        pegi: 3,
      },
      {
        title: "Super Smash Bros",
        image: "https://images.unsplash.com/photo-1612287230217-12ad5229e5b6",
        pegi: 12,
      },
    ];
    const gamesDB = await Game.bulkCreate(gamesList);

    // Utilisateurs (2 Admins + 50 Joueurs)
    console.log("Création des utilisateurs");

    // Admins
    const adminUser = await User.create({
      username: "Admin_Master",
      email: "admin@gamer.com",
      password: adminPassword,
      birthdate: "1990-01-01",
      profil_image: "https://api.dicebear.com/7.x/bottts/svg?seed=Admin",
      role_id: adminRole.id,
    });

    // Liste de pseudos
    const pseudos = [
      "SkyWalker",
      "PixelHero",
      "SpeedyG",
      "LootGoblin",
      "TankGirl",
      "HealerPro",
      "SniperWolf",
      "NoobSlayer",
      "QuestMaster",
      "RetroGamer",
      "CyberPunk",
      "GlitchHunter",
      "XP_Farmer",
      "BossFight",
      "KratosFan",
      "ZeldaLover",
      "SonicSpeed",
      "MarioJump",
      "CreeperAwMan",
      "VictoryRoyale",
      "Lucas",
      "Emma",
      "Nathan",
      "Chloe",
      "Alex",
      "Sarah",
      "Tom",
      "Julie",
      "Max",
      "Lea",
      "Antoine",
      "Marie",
      "Hugo",
      "Camille",
      "Theo",
      "Laura",
      "Arthur",
      "Manon",
      "Louis",
      "Elise",
      "Shadow",
      "Light",
      "Darkness",
      "Storm",
      "Fire",
      "Ice",
      "Wind",
      "Earth",
      "Thunder",
      "Void",
    ];

    const usersData = pseudos.map((name, i) => ({
      username: `${name}_${i}`, // Ajout d'index pour être sûr que c'est unique
      email: `user${i}@gamer.com`,
      password: userPassword,
      birthdate: "2000-01-01",
      profil_image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      role_id: userRole.id,
    }));

    const usersDB = await User.bulkCreate(usersData);
    // admin et users pour piocher plus tard
    const allUsers = [adminUser, ...usersDB];

    // 5. Challenges (3 par jeu environ)
    console.log("Création des challenges");
    let challengesData = [];
    gamesDB.forEach((game) => {
      // Crée 3 challenges pour chaque jeu
      for (let i = 1; i <= 3; i++) {
        challengesData.push({
          title: `Défi ${game.title} #${i}`,
          description: `Ceci est le défi numéro ${i} pour le jeu ${game.title}. ${LOREM_DESC}`,
          rules: "Respecter les règles du fair-play. Vidéo obligatoire.",
          game_id: game.id,
          user_id: adminUser.id,
        });
      }
    });
    const challengesDB = await Challenge.bulkCreate(challengesData);

    // Participation
    console.log("Création des participations");
    let participationsData = [];

    // Chaque user participe à 3 challenges au hasard
    for (const user of usersDB) {
      const nbParticipations = Math.floor(Math.random() * 13);

      for (let k = 0; k < nbParticipations; k++) {
        const randomChallenge =
          challengesDB[Math.floor(Math.random() * challengesDB.length)];
        const randomTitle =
          LOREM_TITLES[Math.floor(Math.random() * LOREM_TITLES.length)];

        participationsData.push({
          title: randomTitle,
          video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // RickRoll :)
          description: LOREM_DESC,
          user_id: user.id,
          challenge_id: randomChallenge.id,
        });
      }
    }
    const participationsDB = await Participation.bulkCreate(participationsData);

    // Votes
    console.log(">> Création des votes");
    let votesData = [];

    // génère entre 0 et 15 votes
    for (const part of participationsDB) {
      const nbVotes = Math.floor(Math.random() * 15);

      // Pour ne pas faire voter toujours les mêmes utilisateurs
      const shuffledUsers = usersDB.sort(() => 0.5 - Math.random());
      const voters = shuffledUsers.slice(0, nbVotes);

      for (const voter of voters) {
        // Un user ne vote pas pour lui-même
        if (voter.id !== part.user_id) {
          votesData.push({
            user_id: voter.id,
            participation_id: part.id,
          });
        }
      }
    }
    await Vote.bulkCreate(votesData);

    console.log("SEEDING TERMINÉ AVEC SUCCÈS !");
    console.log(
      `Stats: ${usersDB.length} users, ${challengesDB.length} challenges, ${participationsDB.length} participations, ${votesData.length} votes.`
    );
  } catch (error) {
    console.error("Erreur durant le seeding :", error);
  } finally {
    await sequelizeClient.close();
  }
}

seedDB();
