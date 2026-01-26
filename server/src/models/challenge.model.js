import { DataTypes, Model } from "sequelize";
import { sequelizeClient } from "../configs/sequelize.client.js";

export class Challenge extends Model {}
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
    rules: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeClient,
    tableName: "challenges",
    timestamps: true,
    underscored: true,
  }
);
