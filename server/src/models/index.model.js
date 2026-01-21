import { sequelizeClient } from "../configs/sequelize.client.js";
import { Game } from "./game.model.js";
import { Challenge } from "./challenge.model.js";
import { User } from "./user.model.js";
import { Role } from "./role.model.js";
import { Vote } from "./vote.model.js";
import { Participation } from "./participation.model.js";

/*
Role < > User
User < > Vote < > Participation
User < > Challenge
Challenge < > Participation 


Jeu < > Challenge
*/

Role.hasMany(User, { foreignKey: "role_id", as: "users" });
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });

User.hasMany(Vote, { foreignKey: "user_id", as: "votes" });
Vote.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Participation, { foreignKey: "user_id", as: "participations" });
Participation.belongsTo(User, { foreignKey: "user_id", as: "author" });

User.hasMany(Challenge, { foreignKey: "user_id", as: "created_challenges" });
Challenge.belongsTo(User, { foreignKey: "user_id", as: "creator" });

Challenge.hasMany(Participation, {
  foreignKey: "challenge_id",
  as: "participations",
});
Participation.belongsTo(Challenge, {
  foreignKey: "challenge_id",
  as: "challenge",
});

Participation.hasMany(Vote, { foreignKey: "participation_id", as: "votes" });
Vote.belongsTo(Participation, {
  foreignKey: "participation_id",
  as: "participation",
});

Game.hasMany(Challenge, { foreignKey: "game_id", as: "challenges" });
Challenge.belongsTo(Game, { foreignKey: "game_id", as: "game" });

export { User, Challenge, Vote, Participation, Game, Role, sequelizeClient };
