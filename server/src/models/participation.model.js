import { sequelizeClient } from "../configs/sequelize.client.js";
import { DataTypes, Model } from "sequelize";

export class Participation extends Model {}
Participation.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    challenge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeClient,
    tableName: "participation",
    timestamps: true,
    underscored: true,
  }
);
