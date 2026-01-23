import { sequelizeClient } from "../configs/sequelize.client.js";
import { Model, DataTypes } from "sequelize";

export class Role extends Model {}
Role.init(
  {
    // Ajoute ici les champs nécessaires pour le modèle Role
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeClient,
    tableName: "roles",
    timestamps: true,
    underscored: true,
  }
);

