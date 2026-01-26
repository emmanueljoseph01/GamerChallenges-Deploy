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

    console.log("Creation des Admins...");
    const adminUser = await User.create({
      username: "Admin_Challenge",
      email: "root@esport.com",
      password: adminPassword,
      birthdate: "1990-01-01",
      profil_image: "https://api.dicebear.com/7.x/initials/svg?seed=SA",
      role_id: adminRole.id,
    });

    const moderatorUser = await User.create({
      username: "Mod_Challenge",
      email: "moderator@esport.com",
      password: adminPassword,
      birthdate: "1995-05-20",
      profil_image: "https://api.dicebear.com/7.x/initials/svg?seed=BH",
      role_id: adminRole.id,
    });

    console.log("Creation des 50 Utilisateurs...");

    const usernames = [
      "MidKing", "SevenZ", "ByWoo", "TheFrenchTitan", "General_K",
      "C0mplex", "Reckless_ADC", "Cloudy_FPS", "OneTap_Machine", "Rage_Quit_Boy",
      "NinjaStrike", "PhantomPlayer", "ShadowHunter", "DragonSlayer", "IceQueen",
      "FireStorm", "ThunderBolt", "CyberNinja", "PixelWarrior", "CosmicGamer",
      "Lucas", "Emma", "Nathan", "Chloe", "Alexandre",
      "Sarah", "Thomas", "Julie", "Maxime", "Lea",
      "Antoine", "Marie", "Hugo", "Camille", "Theo",
      "Laura", "Arthur", "Manon", "Louis", "Elise",
      "Raphael", "Charlotte", "Gabriel", "Amelie", "Victor",
      "Oceane", "Nicolas", "Pauline", "Benjamin", "Clara"
    ];

    const usersList = usernames.map((username, index) => {
      const birthYear = 1995 + (index % 10);
      const month = String((index % 12) + 1).padStart(2, '0');
      return {
        username,
        email: `${username.toLowerCase().replace(/_/g, "")}@gaming.com`,
        password: userPassword,
        birthdate: `${birthYear}-${month}-15`,
        profil_image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        role_id: userRole.id,
      };
    });

    const usersDB = await User.bulkCreate(usersList);

    console.log("Creation des 10 Challenges...");

    const challengesList = [
      {
        title: "Pentakill de Legende",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
        rules: "Pas de smurf, ranked uniquement, replay obligatoire.",
        game_id: gamesDB.find(g => g.title === "League of Legends").id,
        user_id: moderatorUser.id,
      },
      {
        title: "Ace Pistol Round",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
        rules: "Enregistrement complet du round requis, pas de cuts.",
        game_id: gamesDB.find(g => g.title === "Valorant").id,
        user_id: moderatorUser.id,
      },
      {
        title: "Construction Express",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
        rules: "Mode créatif uniquement, temps limité à 10 minutes.",
        game_id: gamesDB.find(g => g.title === "Minecraft").id,
        user_id: adminUser.id,
      },
      {
        title: "But Impossible",
        description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
        rules: "Mode compétitif, but marqué à plus de 50 mètres minimum.",
        game_id: gamesDB.find(g => g.title === "Rocket League").id,
        user_id: moderatorUser.id,
      },
      {
        title: "Victory Royale Solo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        rules: "Mode solo uniquement, minimum 10 éliminations.",
        game_id: gamesDB.find(g => g.title === "Fortnite").id,
        user_id: adminUser.id,
      },
      {
        title: "Boss Fight Speedrun",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        rules: "Aucune aide autorisée, niveau requis maximum 150.",
        game_id: gamesDB.find(g => g.title === "Elden Ring").id,
        user_id: moderatorUser.id,
      },
      {
        title: "Dribble Master",
        description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        rules: "Mode carrière, difficulté légende uniquement.",
        game_id: gamesDB.find(g => g.title === "FIFA 24").id,
        user_id: adminUser.id,
      },
      {
        title: "Sniper Elite",
        description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        rules: "Portée minimale 500m, headshot obligatoire.",
        game_id: gamesDB.find(g => g.title === "Call of Duty: Modern Warfare").id,
        user_id: moderatorUser.id,
      },
      {
        title: "Clutch 1v5",
        description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
        rules: "Mode recherche et destruction, aucun équipier vivant.",
        game_id: gamesDB.find(g => g.title === "Call of Duty: Black Ops 7").id,
        user_id: adminUser.id,
      },
      {
        title: "Baron Steal",
        description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
        rules: "Replay requis avec vision, jungler uniquement.",
        game_id: gamesDB.find(g => g.title === "League of Legends").id,
        user_id: moderatorUser.id,
      },
    ];

    const challengesDB = await Challenge.bulkCreate(challengesList);

    console.log("Creation des 25 Participations...");

    const participationsList = [
      // Challenge 1 - Pentakill (5 participations)
      {
        title: "Outplay Zed vs Talon",
        video_url: "https://youtube.com/watch?v=play001",
        description: "Outplay Zed vs Talon, mecanique pure.",
        user_id: usersDB[0].id,
        challenge_id: challengesDB[0].id,
      },
      {
        title: "Pentakill Katarina",
        video_url: "https://youtube.com/watch?v=play002",
        description: "Pentakill parfait en teamfight.",
        user_id: usersDB[5].id,
        challenge_id: challengesDB[0].id,
      },
      {
        title: "Yasuo Outplay",
        video_url: "https://youtube.com/watch?v=play003",
        description: "Outplay 1v5 sur Yasuo.",
        user_id: usersDB[10].id,
        challenge_id: challengesDB[0].id,
      },
      {
        title: "Master Yi Jungle",
        video_url: "https://youtube.com/watch?v=play004",
        description: "Pentakill Master Yi en 20 secondes.",
        user_id: usersDB[15].id,
        challenge_id: challengesDB[0].id,
      },
      {
        title: "Akali Mechanics",
        video_url: "https://youtube.com/watch?v=play005",
        description: "Mecanique Akali niveau challenger.",
        user_id: usersDB[20].id,
        challenge_id: challengesDB[0].id,
      },
      // Challenge 2 - Ace Pistol (4 participations)
      {
        title: "Icebox Jett Knives",
        video_url: "https://youtube.com/watch?v=play006",
        description: "Ace Jett knives only sur Icebox.",
        user_id: usersDB[1].id,
        challenge_id: challengesDB[1].id,
      },
      {
        title: "Sheriff Headshots",
        video_url: "https://youtube.com/watch?v=play007",
        description: "5 headshots au sheriff.",
        user_id: usersDB[6].id,
        challenge_id: challengesDB[1].id,
      },
      {
        title: "Phantom Rush B",
        video_url: "https://youtube.com/watch?v=play008",
        description: "Rush B parfait avec ace.",
        user_id: usersDB[11].id,
        challenge_id: challengesDB[1].id,
      },
      {
        title: "1v4 Spawn Clutch",
        video_url: "https://youtube.com/watch?v=play009",
        description: "Clutch 1v4 incroyable au spawn.",
        user_id: usersDB[3].id,
        challenge_id: challengesDB[1].id,
      },
      // Challenge 3 - Minecraft (3 participations)
      {
        title: "Chateau Medieval",
        video_url: "https://youtube.com/watch?v=play010",
        description: "Construction d'un chateau en 10 minutes.",
        user_id: usersDB[2].id,
        challenge_id: challengesDB[2].id,
      },
      {
        title: "Tour Eiffel Pixel Art",
        video_url: "https://youtube.com/watch?v=play011",
        description: "Réplique de la Tour Eiffel.",
        user_id: usersDB[7].id,
        challenge_id: challengesDB[2].id,
      },
      {
        title: "Village Japonais",
        video_url: "https://youtube.com/watch?v=play012",
        description: "Village traditionnel japonais.",
        user_id: usersDB[12].id,
        challenge_id: challengesDB[2].id,
      },
      // Challenge 4 - Rocket League (3 participations)
      {
        title: "Aerial Goal 60m",
        video_url: "https://youtube.com/watch?v=play013",
        description: "But aérien incroyable.",
        user_id: usersDB[4].id,
        challenge_id: challengesDB[3].id,
      },
      {
        title: "Freestyle Double Touch",
        video_url: "https://youtube.com/watch?v=play014",
        description: "Double touch freestyle parfait.",
        user_id: usersDB[8].id,
        challenge_id: challengesDB[3].id,
      },
      {
        title: "Ceiling Shot Goal",
        video_url: "https://youtube.com/watch?v=play015",
        description: "But depuis le plafond.",
        user_id: usersDB[13].id,
        challenge_id: challengesDB[3].id,
      },
      // Challenge 5 - Fortnite (2 participations)
      {
        title: "Victory Royale 15 kills",
        video_url: "https://youtube.com/watch?v=play016",
        description: "15 éliminations en solo.",
        user_id: usersDB[9].id,
        challenge_id: challengesDB[4].id,
      },
      {
        title: "No Build Victory",
        video_url: "https://youtube.com/watch?v=play017",
        description: "Victoire sans construire.",
        user_id: usersDB[14].id,
        challenge_id: challengesDB[4].id,
      },
      // Challenge 6 - Elden Ring (2 participations)
      {
        title: "Malenia No Hit",
        video_url: "https://youtube.com/watch?v=play018",
        description: "Malenia sans prendre de dégâts.",
        user_id: usersDB[16].id,
        challenge_id: challengesDB[5].id,
      },
      {
        title: "Radagon Speedrun",
        video_url: "https://youtube.com/watch?v=play019",
        description: "Radagon en moins de 2 minutes.",
        user_id: usersDB[18].id,
        challenge_id: challengesDB[5].id,
      },
      // Challenge 7 - FIFA (2 participations)
      {
        title: "Rainbow Flick Goal",
        video_url: "https://youtube.com/watch?v=play020",
        description: "But avec rainbow flick.",
        user_id: usersDB[17].id,
        challenge_id: challengesDB[6].id,
      },
      {
        title: "Elastico Skill Move",
        video_url: "https://youtube.com/watch?v=play021",
        description: "Dribble elastico parfait.",
        user_id: usersDB[19].id,
        challenge_id: challengesDB[6].id,
      },
      // Challenge 8 - COD MW (2 participations)
      {
        title: "Longshot 750m",
        video_url: "https://youtube.com/watch?v=play022",
        description: "Snipe à 750 mètres.",
        user_id: usersDB[21].id,
        challenge_id: challengesDB[7].id,
      },
      {
        title: "Triple Collateral",
        video_url: "https://youtube.com/watch?v=play023",
        description: "Triple kill en un tir.",
        user_id: usersDB[23].id,
        challenge_id: challengesDB[7].id,
      },
      // Challenge 9 - COD BO7 (1 participation)
      {
        title: "1v5 Clutch Defuse",
        video_url: "https://youtube.com/watch?v=play024",
        description: "Clutch 1v5 avec désamorçage.",
        user_id: usersDB[22].id,
        challenge_id: challengesDB[8].id,
      },
      // Challenge 10 - Baron Steal (1 participation)
      {
        title: "Smite Baron Steal",
        video_url: "https://youtube.com/watch?v=play025",
        description: "Vol de baron au smite parfait.",
        user_id: usersDB[24].id,
        challenge_id: challengesDB[9].id,
      },
    ];

    const participationsDB = await Participation.bulkCreate(participationsList);

    console.log("Creation des 30 Votes...");

    const votesList = [];
    
    // Distribution des votes sur les participations
    // Participation 0 (Pentakill) - 5 votes
    for (let i = 0; i < 5; i++) {
      votesList.push({
        user_id: usersDB[25 + i].id,
        participation_id: participationsDB[0].id,
      });
    }

    // Participation 1 - 4 votes
    for (let i = 0; i < 4; i++) {
      votesList.push({
        user_id: usersDB[30 + i].id,
        participation_id: participationsDB[1].id,
      });
    }

    // Participation 5 (Jett) - 4 votes
    for (let i = 0; i < 4; i++) {
      votesList.push({
        user_id: usersDB[34 + i].id,
        participation_id: participationsDB[5].id,
      });
    }

    // Participation 9 (Minecraft) - 3 votes
    for (let i = 0; i < 3; i++) {
      votesList.push({
        user_id: usersDB[38 + i].id,
        participation_id: participationsDB[9].id,
      });
    }

    // Participation 12 (Rocket League) - 3 votes
    for (let i = 0; i < 3; i++) {
      votesList.push({
        user_id: usersDB[41 + i].id,
        participation_id: participationsDB[12].id,
      });
    }

    // Participation 15 (Fortnite) - 3 votes
    for (let i = 0; i < 3; i++) {
      votesList.push({
        user_id: usersDB[44 + i].id,
        participation_id: participationsDB[15].id,
      });
    }

    // Participation 17 (Elden Ring) - 2 votes
    votesList.push(
      {
        user_id: usersDB[47].id,
        participation_id: participationsDB[17].id,
      },
      {
        user_id: usersDB[48].id,
        participation_id: participationsDB[17].id,
      }
    );

    // Participation 19 (FIFA) - 2 votes
    votesList.push(
      {
        user_id: usersDB[49].id,
        participation_id: participationsDB[19].id,
      },
      {
        user_id: moderatorUser.id,
        participation_id: participationsDB[19].id,
      }
    );

    // Participation 21 (COD) - 2 votes
    votesList.push(
      {
        user_id: adminUser.id,
        participation_id: participationsDB[21].id,
      },
      {
        user_id: usersDB[0].id,
        participation_id: participationsDB[21].id,
      }
    );

    // Participation 23 (Baron) - 2 votes
    votesList.push(
      {
        user_id: usersDB[1].id,
        participation_id: participationsDB[24].id,
      },
      {
        user_id: usersDB[2].id,
        participation_id: participationsDB[24].id,
      }
    );

    await Vote.bulkCreate(votesList);

    console.log("Seeding termine avec succes !");
    console.log(`- 2 admins créés`);
    console.log(`- 50 utilisateurs créés`);
    console.log(`- 9 jeux créés`);
    console.log(`- 10 challenges créés`);
    console.log(`- 25 participations créées`);
    console.log(`- 30 votes créés`);
    
  } catch (error) {
    console.error("Erreur durant le seeding :", error);
  } finally {
    console.log("Fermeture de la connexion...");
    await sequelizeClient.close();
  }
}

seedDB();