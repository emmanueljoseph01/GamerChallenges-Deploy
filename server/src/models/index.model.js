<<<<<<< HEAD
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


=======
import { User } from "./user.model.js";
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
