import argon2 from "argon2";
import { Participation, Role, User, Vote } from "../models/index.model.js";
import { col, fn } from "sequelize";

export class UserService {
  async create(payload) {
    const hashedPassword = await argon2.hash(payload.password);

    const user = await User.create({
      ...payload,
      password: hashedPassword,
    });

    return await User.findByPk(user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Role }],
    });
  }

  async findAll() {
    return await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        { model: Role },
        {
          model: Participation,
          include: [{ model: Vote }],
        },
      ],
    });
  }

  async findOne(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Role }],
    });
  }

  async update(id, payload) {
    const user = await User.findByPk(id);
    if (!user) return null;

    const { role_id, password, profil_image, ...allowedUpdates } = payload;

    if (password) {
      allowedUpdates.password = await argon2.hash(password);
    }

    await user.update(allowedUpdates);

    return await User.findByPk(user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Role }],
    });
  }

  async delete(id) {
    return await User.destroy({ where: { id } });
  }

  async getLeaderboard({ limit = 25 } = {}) {
    const safeLimit = Math.max(1, Math.min(100, Number(limit) || 25));

    return await User.findAll({
      attributes: [
        "id",
        "username",
        "profil_image",
        [fn("COUNT", fn("DISTINCT", col("Participations.id"))), "nbDefis"],
        [fn("COUNT", fn("DISTINCT", col("Participations->Votes.id"))), "nbVotes"],
      ],
      include: [
        {
          model: Participation,
          attributes: [],
          required: false,
          include: [{ model: Vote, attributes: [], required: false }],
        },
      ],
      group: ["User.id", "User.username", "User.profil_image"],
      order: [
        [fn("COUNT", fn("DISTINCT", col("Participations.id"))), "DESC"],
        [fn("COUNT", fn("DISTINCT", col("Participations->Votes.id"))), "DESC"],
      ],
      limit: safeLimit,
      subQuery: false,
      raw: true,
    });
  }
}

export const userService = new UserService();
