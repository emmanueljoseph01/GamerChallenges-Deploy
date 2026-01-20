import sequelizeClient from "../configs/sequelize.client.js";
<<<<<<< HEAD
import { DataTypes, Model } from "sequelize";
=======
import { Model, DataTypes } from "sequelize";
>>>>>>> 2308e70cb94f6f1ba6bb7a006e74ba54d51b8f22

export class Participation extends Model {}

Participation.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Autres champs...
  },
  {
    sequelize: sequelizeClient,
    modelName: 'Participation',
    tableName: 'participations',
    timestamps: true,
    underscored: true,
  }
); 
