import { sequelizeClient } from "../configs/sequelize.client.js";
import { DataTypes, Model } from "sequelize";

export class Participation extends Model {}
Participation.init(
  {
    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeClient,
    tableName: "participations",
    timestamps: true,
    underscored: true,
  }
);
