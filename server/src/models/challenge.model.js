import { sequelizeClient } from "../configs/sequelize.client";
import { Model, DataTypes } from "sequelize";

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
  },
  {
    sequelize: sequelizeClient,
    tableName: "challenges",
    timestamps: true,
    underscored: true,
  }
);
