import sequelizeClient from "../configs/sequelize.client.js";
import { User } from "./user.model.js";
import { Game } from "./game.model.js";
import { Participation } from "./participation.model.js";

// Définition des relations entre les modèles
User.hasMany(Participation, { foreignKey: 'userId' });
Participation.belongsTo(User, { foreignKey: 'userId' });

Game.hasMany(Participation, { foreignKey: 'gameId' });
Participation.belongsTo(Game, { foreignKey: 'gameId' });

export { User, Game, Participation };


