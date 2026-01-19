import { DataTypes, Model } from "sequelize";
import sequelizeClient from "../configs/sequelize.client.js";


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
