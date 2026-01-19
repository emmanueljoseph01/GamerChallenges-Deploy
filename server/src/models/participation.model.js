import sequelizeClient from "../configs/sequelize.client.js";
import { Model, DataTypes } from "sequelize";

export class Participation extends Model {}

Participation.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Autres champs...
  },
  {
    sequelize: sequelizeClient,
    modelName: 'Participation',
    tableName: 'participations',
    timestamps: true,
    underscored: true,
  }
);
