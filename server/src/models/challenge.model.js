import sequelizeClient from "../configs/sequelize.client.js";
import { Model, DataTypes } from "sequelize";

export class Challenge extends Model {} // Vérifie que cette ligne est présente

Challenge.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Ajoute d'autres champs si nécessaire
  },
  {
    sequelize: sequelizeClient,
    modelName: 'Challenge',
    tableName: 'challenges',
    timestamps: true,
    underscored: true,
  }
);
