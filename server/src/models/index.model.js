import { sequelizeClient } from "../configs/sequelize.client.js";
import { Challenge } from "./challenge.model.js";
import { Game } from "./game.model.js";
import { Participation } from "./participation.model.js";
import { Role } from "./role.model.js";
import { User } from "./user.model.js";
import { Vote } from "./vote.model.js";

// ============================================
// ROLE <-> USER
// ============================================
// Un rôle peut avoir plusieurs utilisateurs
Role.hasMany(User, { foreignKey: "role_id" });
// Un utilisateur appartient à un rôle
User.belongsTo(Role, { foreignKey: "role_id" });

// ============================================
// USER <-> VOTE
// ============================================
// Un utilisateur peut voter plusieurs fois (sur différentes participations)
User.hasMany(Vote, { foreignKey: "user_id", onDelete: "CASCADE" });
// Un vote appartient à un utilisateur
Vote.belongsTo(User, { foreignKey: "user_id" });

// ============================================
// PARTICIPATION <-> VOTE
// ============================================
// Une participation peut recevoir plusieurs votes
Participation.hasMany(Vote, {
  foreignKey: "participation_id",
  onDelete: "CASCADE",
});
// Un vote concerne une participation
Vote.belongsTo(Participation, { foreignKey: "participation_id" });

// ============================================
// USER <-> PARTICIPATION
// ============================================
// Un utilisateur peut participer plusieurs fois (à différents challenges)
User.hasMany(Participation, { foreignKey: "user_id", onDelete: "CASCADE" });
// Une participation est créée par un utilisateur
Participation.belongsTo(User, { foreignKey: "user_id" });

// ============================================
// USER <-> CHALLENGE
// ============================================
// Un utilisateur peut créer plusieurs challenges
User.hasMany(Challenge, { foreignKey: "user_id", onDelete: "CASCADE" });
// Un challenge est créé par un utilisateur
Challenge.belongsTo(User, { foreignKey: "user_id" });

// ============================================
// CHALLENGE <-> PARTICIPATION
// ============================================
// Un challenge peut avoir plusieurs participations
Challenge.hasMany(Participation, {
  foreignKey: "challenge_id",
  onDelete: "CASCADE",
});
// Une participation concerne un challenge
Participation.belongsTo(Challenge, { foreignKey: "challenge_id" });

// ============================================
// GAME <-> CHALLENGE
// ============================================
// Un jeu peut avoir plusieurs challenges
Game.hasMany(Challenge, { foreignKey: "game_id" });
// Un challenge concerne un jeu
Challenge.belongsTo(Game, { foreignKey: "game_id" });

export { Challenge, Game, Participation, Role, sequelizeClient, User, Vote };
