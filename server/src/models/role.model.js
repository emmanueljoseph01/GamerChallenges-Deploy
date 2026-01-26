import { DataTypes, Model } from "sequelize";
import { sequelizeClient } from "../configs/sequelize.client.js";

export class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: sequelizeClient,
    tableName: "roles",
    timestamps: false,
    underscored: true,
  }
);
