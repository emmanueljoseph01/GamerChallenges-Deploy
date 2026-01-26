import { DataTypes, Model } from "sequelize";
import { sequelizeClient } from "../configs/sequelize.client.js";

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
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "participation_id"],
      },
    ],
  }
);
