import { sequelizeClient } from "../configs/sequelize.client.js";
import { Model, DataTypes } from "sequelize";

export class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    profile_image: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeClient,
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);
