import { sequelizeClient } from "../configs/sequelize.client.js";
import { Model, DataTypes } from "sequelize";

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
  },
  {
    timestamps: true,
    underscored: true,
  }
);
