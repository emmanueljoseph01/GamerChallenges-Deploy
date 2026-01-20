import sequelizeClient from "../configs/sequelize.client.js";
import { Model, DataTypes } from "sequelize";

<<<<<<< HEAD
export class Challenge extends Model {} // Vérifie que cette ligne est présente
=======
export class Challenge extends Model {}
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22

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
<<<<<<< HEAD
    // Ajoute d'autres champs si nécessaire
=======
    // Autres champs...
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
  },
  {
    sequelize: sequelizeClient,
    modelName: 'Challenge',
    tableName: 'challenges',
    timestamps: true,
    underscored: true,
  }
);
<<<<<<< HEAD
=======

>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22
