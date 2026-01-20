import sequelizeClient from "../configs/sequelize.client.js";
import { Model, DataTypes } from "sequelize";

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
    sequelize: sequelizeClient,
    tableName: "games",
    timestamps: true,
    underscored: true,
  }
);
