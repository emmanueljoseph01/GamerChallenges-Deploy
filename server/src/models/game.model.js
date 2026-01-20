<<<<<<< HEAD
import { DataTypes, Model } from "sequelize";
import sequelizeClient from "../configs/sequelize.client.js";

=======
import sequelizeClient from "../configs/sequelize.client.js";
import { Model, DataTypes } from "sequelize";
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22

export class Game extends Model {}

Game.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeClient, // Utilise l'instance Sequelize configurée
    tableName: "games",         // Nom de la table dans la base de données
    timestamps: true,           // Ajoute les champs createdAt et updatedAt
    underscored: true,          // Utilise des underscores pour les noms de colonnes
  }
);
