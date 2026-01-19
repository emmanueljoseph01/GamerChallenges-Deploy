import { sequelizeClient } from "../configs/sequelize.client.js";
import { DataTypes, Model } from "sequelize";

export class Participation extends Model {}
Participation.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeClient,
    tableName: "participations",
    timestamps: true,
    underscored: true,
  }
);
