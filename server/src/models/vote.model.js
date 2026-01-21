import { sequelizeClient } from "../configs/sequelize.client.js";
import { Model, DataTypes } from "sequelize";

export class Vote extends Model {}

Vote.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    participation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "participations",
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeClient,
    tableName: "votes",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "participation_id"],
      },
    ],
  }
);
