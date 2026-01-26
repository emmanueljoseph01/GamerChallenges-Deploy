import { sequelizeClient } from "../configs/sequelize.client.js";
import { Model, DataTypes } from "sequelize";

export class Role extends Model {}
<<<<<<< HEAD
Role.init(
  {
    // Ajoute ici les champs nécessaires pour le modèle Role
    name: {
      type: DataTypes.STRING,
      allowNull: false,
=======

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
>>>>>>> a5a4fb113cf9e4830693b130ed9954f0768fc0a4
    },
  },
  {
    sequelize: sequelizeClient,
    tableName: "roles",
<<<<<<< HEAD
    timestamps: true,
    underscored: true,
  }
);

=======
    timestamps: false,
    underscored: true,
  }
);
>>>>>>> a5a4fb113cf9e4830693b130ed9954f0768fc0a4
